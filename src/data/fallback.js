// Fallback data for graceful degradation when API key is missing or API call fails.
// Solves Edge Cases 1.1, 1.2, 1.5, 1.6, 9.1

export const fallbackAIInsights = {
  summary: "Buyers highlight instant 10-minute Blinkit delivery and genuine product quality with sealed packaging. Sound quality and battery life are praised as excellent for the ₹1,499 price tag.",
  pros: [
    "Authentic boAt product with warranty card",
    "Lightning fast 10-minute Blinkit delivery",
    "Great bass & 42H total battery backup",
    "IPX4 water & sweat resistance"
  ],
  cons: [
    "Charging case glossy finish is prone to smudges",
    "Mic quality is average in noisy outdoor environments"
  ],
  quickAsk: {
    genuine: "Yes, boAt is an authorized brand on Blinkit. All electronics come directly from verified supply chain partners with full brand warranty.",
    returns: "Blinkit offers a hassle-free 48-hour doorstep return policy with no questions asked and same-day pickup scheduling.",
    worthIt: "At ₹1,499 with 10-minute doorstep delivery and 48-hr returns, you get instant gratification without waiting 2-3 days on conventional e-commerce platforms."
  },
  isFallback: true
};
