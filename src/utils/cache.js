// Utilities for sessionStorage caching with full error handling for Edge Cases 2.1, 2.2, 2.3

const CACHE_PREFIX = 'blinkit_ai_insights_';

/**
 * Retrieves cached AI insights for a given product ID
 * @param {string} productId 
 * @returns {object|null}
 */
export const getCachedInsights = (productId) => {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) {
      return null; // Edge Case 2.1: sessionStorage unavailable
    }

    const cachedStr = sessionStorage.getItem(`${CACHE_PREFIX}${productId}`);
    if (!cachedStr) return null;

    const cachedData = JSON.parse(cachedStr);

    // Edge Case 2.3: Validate cached schema integrity
    if (
      cachedData &&
      typeof cachedData === 'object' &&
      cachedData.data &&
      cachedData.data.summary &&
      Array.isArray(cachedData.data.pros) &&
      Array.isArray(cachedData.data.cons) &&
      cachedData.data.quickAsk
    ) {
      return cachedData.data;
    }

    // Corrupted cache - remove it
    sessionStorage.removeItem(`${CACHE_PREFIX}${productId}`);
    return null;
  } catch (error) {
    console.warn('sessionStorage read failed:', error);
    return null;
  }
};

/**
 * Stores AI insights in sessionStorage for a given product ID
 * @param {string} productId 
 * @param {object} data 
 */
export const setCachedInsights = (productId, data) => {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return;

    const payload = {
      timestamp: Date.now(),
      productId,
      data
    };

    sessionStorage.setItem(`${CACHE_PREFIX}${productId}`, JSON.stringify(payload));
  } catch (error) {
    // Edge Case 2.2: Handle QuotaExceededError or security restrictions
    console.warn('sessionStorage write failed:', error);
    try {
      sessionStorage.removeItem(`${CACHE_PREFIX}${productId}`);
    } catch (_) {}
  }
};
