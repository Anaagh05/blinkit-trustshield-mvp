import React from 'react';

const TrustShield = () => {
  return (
    <div className="bg-[#ECFDF5] border-l-4 border-[#0C831F] p-4 my-2 mx-4 rounded-r-lg shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-xl shrink-0">🛡️</div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 leading-tight">Brand Authorized · Verified Supply Chain</h3>
          <p className="text-xs text-gray-600 mt-0.5">Sourced directly from authorized distributors.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="text-xl shrink-0">📦</div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 leading-tight">Easy Doorstep Return · No Questions Asked</h3>
          <p className="text-xs text-gray-600 mt-0.5">48-hour return window with same-day pickup.</p>
        </div>
      </div>
    </div>
  );
};

export default TrustShield;
