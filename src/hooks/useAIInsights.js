import { useState, useCallback, useRef } from 'react';
import { getCachedInsights, setCachedInsights } from '../utils/cache';
import { fetchAIInsights } from '../services/gemini';
import { fallbackAIInsights } from '../data/fallback';

/**
 * Custom hook to manage fetching and caching of Gemini AI review insights.
 * Handles offline checks (3.1), session caching (2.1), and loading/error states.
 * 
 * @param {object} product 
 * @param {Array} reviews 
 */
export const useAIInsights = (product, reviews) => {
  const [aiResponse, setAiResponse] = useState(() => getCachedInsights(product?.id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isRequestInFlight = useRef(false); // Prevents race conditions (Edge Case 4.1, 4.2)

  const triggerAI = useCallback(async () => {
    if (isRequestInFlight.current) return; // Prevent duplicate requests

    // Check cache first
    const cached = getCachedInsights(product?.id);
    if (cached) {
      setAiResponse(cached);
      setError(null);
      return;
    }

    // Edge Case 3.1: Check offline status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setError('OFFLINE');
      setAiResponse(fallbackAIInsights);
      return;
    }

    isRequestInFlight.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAIInsights(product, reviews);
      setAiResponse(data);
      setError(null);
      // Only cache if it's NOT fallback data (i.e., it came from the real API)
      if (!data.notice && !data.isFallback) {
        setCachedInsights(product?.id, data);
      }
    } catch (err) {
      console.warn('AI Insights trigger failed, using fallback:', err.message);
      if (err.message === 'RATE_LIMIT') {
        setError('RATE_LIMIT');
      } else if (err.message === 'TIMEOUT') {
        setError('TIMEOUT');
      } else {
        setError('GENERIC');
      }
      // Provide fallback data so UI remains functional
      setAiResponse(fallbackAIInsights);
    } finally {
      setLoading(false);
      isRequestInFlight.current = false;
    }
  }, [product, reviews]);

  return {
    aiResponse,
    loading,
    error,
    triggerAI,
    isCached: !!getCachedInsights(product?.id)
  };
};
