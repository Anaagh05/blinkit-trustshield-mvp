import React from 'react';

const TrustShield = () => {
  return (
    <div className="mx-3 my-2 bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-green-200 rounded-xl p-3 shadow-2xs">
      <div className="flex items-center gap-1.5 mb-2.5">
        <div className="w-5 h-5 bg-[#0C831F] rounded-full flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
        </div>
        <span className="text-[11px] font-bold text-[#0C831F] uppercase tracking-wider">Blinkit TrustShield</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2.5">
          <span className="text-sm shrink-0 mt-0.5">🛡️</span>
          <div>
            <p className="text-[12px] font-bold text-gray-900 leading-tight">Brand Authorized · Verified Supply Chain</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Sourced directly from authorized distributors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustShield;
