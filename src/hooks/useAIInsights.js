import { useState, useCallback } from 'react';
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

  const triggerAI = useCallback(async () => {
    if (loading) return; // Prevent duplicate requests (Edge Case 4.1, 4.2)

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

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAIInsights(product, reviews);
      setAiResponse(data);
      setCachedInsights(product?.id, data);
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
    }
  }, [product, reviews, loading]);

  return {
    aiResponse,
    loading,
    error,
    triggerAI,
    isCached: !!getCachedInsights(product?.id)
  };
};
