import React, { useState, useEffect } from 'react';

const TesterBanner = ({ shieldActive }) => {
  const [dismissed, setDismissed] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Pulse animation cycle
  useEffect(() => {
    if (shieldActive) return;
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, [shieldActive]);

  if (dismissed && shieldActive) return null;

  return (
    <div className={`w-full max-w-[460px] mb-2 shrink-0 transition-all duration-500 ${shieldActive ? 'opacity-0 translate-y-[-10px] pointer-events-none h-0 mb-0' : 'opacity-100'}`}>
      {/* Main tester callout */}
      <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-xl px-4 py-2.5 shadow-lg border border-purple-400/20 overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none"></div>
        
        <div className="relative flex items-center gap-3">
          {/* Icon */}
          <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
            <span className="text-base">👆</span>
          </div>
          
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-[11px] font-bold leading-tight">
              Hey Tester! 👋 Look for the green
              <span className="inline-flex items-center mx-1 px-1.5 py-0.5 bg-[#0C831F] rounded text-[9px] font-bold text-white align-middle">
                🛡️ View TrustShield Report
              </span>
              button inside the app
            </p>
            <p className="text-purple-200 text-[9px] mt-0.5 leading-tight">
              Click it to activate our AI-powered trust features → replacement, warranty & offers
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TesterBanner;
