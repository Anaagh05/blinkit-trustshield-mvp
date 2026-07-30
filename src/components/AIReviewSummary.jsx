import React from 'react';

const AIReviewSummary = ({ loading, error, aiResponse, onSummarize }) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm p-4 my-3 mx-4 rounded-xl border border-purple-200/80 shadow-md relative overflow-hidden transition-all duration-300">
      {/* 4A Polish: Gradient border top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600"></div>

      <div className="flex items-center justify-between mb-3 pt-1">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <span className="text-base">✨</span> What Buyers Are Saying
        </h2>
        <span className="text-[10px] text-purple-700 bg-purple-100/70 font-semibold px-2 py-0.5 rounded-full border border-purple-200 shadow-2xs">
          AI Powered
        </span>
      </div>

      {/* State 1: Idle State - Show CTA Button with 4B Micro-animations */}
      {!loading && !aiResponse && (
        <div className="text-center py-3.5 px-3 bg-gradient-to-br from-purple-50/90 to-indigo-50/60 rounded-xl border border-purple-100/90 shadow-2xs">
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Get instant AI insights distilled from 1,420 real customer reviews.
          </p>
          <button
            onClick={onSummarize}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-md active:scale-95 transition-all animate-pulse-glow flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>✨</span> Summarize Reviews with AI
          </button>
        </div>
      )}

      {/* State 2: Loading State - Shimmer skeleton */}
      {loading && (
        <div className="space-y-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700 flex items-center gap-2">
              <svg className="animate-spin h-3.5 w-3.5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing 1,420 customer reviews...
            </span>
          </div>
          <div className="h-3 rounded w-full animate-shimmer"></div>
          <div className="h-3 rounded w-5/6 animate-shimmer"></div>
          <div className="h-3 rounded w-4/6 animate-shimmer"></div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="h-16 rounded-lg animate-shimmer"></div>
            <div className="h-16 rounded-lg animate-shimmer"></div>
          </div>
        </div>
      )}

      {/* State 3: Error / Fallback Banner */}
      {error && !loading && (
        <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-lg text-center my-1">
          <p className="text-xs font-medium text-amber-900 mb-1.5">
            {error === 'OFFLINE' && 'Offline mode — displaying cached AI summary.'}
            {error === 'RATE_LIMIT' && 'AI engine busy. Displaying cached insights.'}
            {error === 'TIMEOUT' && 'Request timed out. Tap to retry.'}
            {error === 'GENERIC' && 'Using cached AI summary.'}
          </p>
          <button
            onClick={onSummarize}
            className="text-xs font-bold text-purple-700 underline hover:text-purple-800"
          >
            Retry Fresh AI Analysis
          </button>
        </div>
      )}

      {/* State 4: Loaded AI Summary Card with 4B fadeInUp animation */}
      {aiResponse && !loading && (
        <div className="space-y-3 animate-fade-in-up">
          {/* Summary Text */}
          <div className="p-3.5 bg-purple-50/70 border border-purple-100/80 rounded-xl shadow-2xs">
            <p className="text-xs text-gray-800 leading-relaxed font-normal">
              {aiResponse.summary}
            </p>
          </div>

          {/* Pros & Cons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Pros */}
            <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1 mb-1.5">
                <span>👍</span> What Buyers Loved
              </span>
              <ul className="space-y-1">
                {aiResponse.pros.map((pro, idx) => (
                  <li key={idx} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-3 bg-amber-50/80 border border-amber-100 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1 mb-1.5">
                <span>👎</span> Things to Keep in Mind
              </span>
              <ul className="space-y-1">
                {aiResponse.cons.map((con, idx) => (
                  <li key={idx} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4A Polish: Watermark branding */}
          <div className="flex justify-between items-center pt-1 border-t border-purple-100/50">
            <span className="text-[10px] text-purple-700 font-medium">Powered by Gemini 2.0 Flash ✨</span>
            <span className="text-[10px] text-gray-400">Cached for 0-token revisits</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReviewSummary;
