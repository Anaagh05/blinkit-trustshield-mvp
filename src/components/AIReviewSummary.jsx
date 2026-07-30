import React from 'react';

const AIReviewSummary = ({ loading, error, aiResponse, onSummarize }) => {
  return (
    <div className="mx-3 my-2 bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
      {/* Section header */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <h2 className="text-[13px] font-bold text-gray-900 flex items-center gap-1.5">
          <span className="text-base">✨</span> What Buyers Are Saying
        </h2>
        <span className="text-[9px] text-purple-700 bg-purple-50 font-bold px-1.5 py-0.5 rounded-full border border-purple-100">
          AI POWERED
        </span>
      </div>

      <div className="px-3 pb-3">
        {/* Idle: CTA Button */}
        {!loading && !aiResponse && (
          <div className="text-center py-3 px-2 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-lg border border-purple-100">
            <p className="text-[11px] text-gray-500 mb-2.5">
              AI-powered insights from {(1420).toLocaleString()} customer reviews
            </p>
            <button
              onClick={onSummarize}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold rounded-lg shadow-md active:scale-[0.98] transition-transform animate-pulse-glow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              ✨ Summarize Reviews with AI
            </button>
          </div>
        )}

        {/* Loading: Shimmer skeleton */}
        {loading && (
          <div className="space-y-2 py-1" role="status" aria-busy="true" aria-label="Loading AI summary">
            <div className="flex items-center gap-2 mb-1">
              <svg className="animate-spin h-3 w-3 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-[10px] font-semibold text-purple-700">Analyzing reviews...</span>
            </div>
            <div className="h-2.5 rounded w-full animate-shimmer"></div>
            <div className="h-2.5 rounded w-5/6 animate-shimmer"></div>
            <div className="h-2.5 rounded w-3/5 animate-shimmer"></div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-14 rounded-lg animate-shimmer"></div>
              <div className="h-14 rounded-lg animate-shimmer"></div>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && !loading && (
          <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-center mb-2">
            <p className="text-[10px] font-medium text-amber-800 mb-1">
              {error === 'OFFLINE' && 'Offline — showing cached insights'}
              {error === 'RATE_LIMIT' && 'AI engine busy — showing cached insights'}
              {error === 'TIMEOUT' && 'Request timed out'}
              {error === 'GENERIC' && 'Using cached AI summary'}
            </p>
            <button onClick={onSummarize} className="text-[10px] font-bold text-purple-700 underline">
              Retry
            </button>
          </div>
        )}

        {/* Loaded: AI Summary Card */}
        {aiResponse && !loading && (
          <div className="space-y-2 animate-fade-in-up">
            {/* Summary */}
            <div className="p-2.5 bg-purple-50/60 rounded-lg">
              <p className="text-[11px] text-gray-700 leading-relaxed">
                {aiResponse.summary}
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-800 mb-1">👍 Buyers Loved</p>
                <ul className="space-y-0.5">
                  {aiResponse.pros.map((pro, i) => (
                    <li key={i} className="text-[10px] text-gray-700 flex gap-1">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-[10px] font-bold text-amber-800 mb-1">👎 Keep in Mind</p>
                <ul className="space-y-0.5">
                  {aiResponse.cons.map((con, i) => (
                    <li key={i} className="text-[10px] text-gray-700 flex gap-1">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Watermark */}
            <div className="flex justify-between items-center pt-1">
              <span className="text-[8px] text-purple-600 font-medium">Powered by Gemini 2.0 Flash ✨</span>
              <span className="text-[8px] text-gray-300">Cached · 0-token revisits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIReviewSummary;
