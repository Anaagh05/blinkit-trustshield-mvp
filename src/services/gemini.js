import { fallbackAIInsights } from '../data/fallback';

/**
 * Single-call AI review analysis service using Gemini 2.0 Flash REST API.
 * Solves Edge Cases 1.1 - 1.12 & 6.1.
 * 
 * @param {object} product 
 * @param {Array} reviews 
 * @returns {Promise<object>}
 */
export const fetchAIInsights = async (product, reviews) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Edge Case 1.1: API key missing
  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.warn('Gemini API key is not configured. Utilizing fallback response.');
    return { ...fallbackAIInsights, notice: 'API key not configured — displaying fallback data.' };
  }

  // Edge Case 6.1: Empty reviews list
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    return { ...fallbackAIInsights, notice: 'No reviews available to summarize.' };
  }

  // Trim reviews to 150 chars max to stay within token budget
  const trimmedReviews = reviews.slice(0, 20).map((r, i) => `${i + 1}. [Rating: ${r.rating}/5] ${r.text.slice(0, 150)}`);

  const prompt = `System: You are an AI review analyst for Blinkit quick-commerce. Analyze customer feedback for the given product and return ONLY a valid JSON object. Do not include markdown code block syntax (such as \`\`\`json).

Product: ${product.name}
Category: ${product.category}
Price: ₹${product.price}

Customer Reviews:
${trimmedReviews.join('\n')}

Return ONLY valid JSON in this exact structure:
{
  "summary": "2-3 sentence overall buyer sentiment summary highlighting quality and quick-commerce delivery experience.",
  "pros": ["Pro point 1", "Pro point 2", "Pro point 3", "Pro point 4"],
  "cons": ["Con point 1", "Con point 2"],
  "quickAsk": {
    "genuine": "2 sentence explanation confirming brand authorization and supply chain verification.",
    "returns": "2 sentence explanation of 48-hour doorstep return policy.",
    "worthIt": "2 sentence value proposition explaining why instant 10-minute delivery & peace of mind is worth ₹1,499."
  }
}`;

  // Edge Case 1.4: 15-second request timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      }
    );

    clearTimeout(timeoutId);

    // Edge Case 1.3: Rate limit 429 or other HTTP error
    if (response.status === 429) {
      throw new Error('RATE_LIMIT');
    }

    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('EMPTY_RESPONSE');
    }

    // Edge Case 1.5 & 1.6: Parse JSON safely
    let parsed;
    try {
      // Clean potential markdown blocks if returned despite instructions
      const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanedText);
    } catch (e) {
      // Regex fallback extraction
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('MALFORMED_JSON');
      }
    }

    // Edge Case 1.7: Validate schema completeness
    const validated = {
      summary: parsed.summary || fallbackAIInsights.summary,
      pros: Array.isArray(parsed.pros) && parsed.pros.length > 0 ? parsed.pros : fallbackAIInsights.pros,
      cons: Array.isArray(parsed.cons) && parsed.cons.length > 0 ? parsed.cons : fallbackAIInsights.cons,
      quickAsk: {
        genuine: parsed.quickAsk?.genuine || fallbackAIInsights.quickAsk.genuine,
        returns: parsed.quickAsk?.returns || fallbackAIInsights.quickAsk.returns,
        worthIt: parsed.quickAsk?.worthIt || fallbackAIInsights.quickAsk.worthIt
      }
    };

    return validated;

  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('TIMEOUT');
    }
    console.error('Gemini API fetch error:', err.message);
    throw err;
  }
};
