import React, { useState } from 'react';

const ProductImage = ({ imageSrc, productName }) => {
  const [imgError, setImgError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="bg-white flex flex-col pt-2 pb-4 shrink-0">
      {/* Product Image Area */}
      <div className="relative mx-4 bg-[#f5f6f8] rounded-[28px] h-[220px] flex items-center justify-center overflow-hidden">
        {imgError ? (
          <div className="text-gray-400 text-xs font-medium text-center p-4">
            {productName}<br/>(Image Unavailable)
          </div>
        ) : (
          <img 
            src={imageSrc} 
            alt={productName}
            className="w-full h-full object-contain p-4 mix-blend-multiply"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Gallery dots */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all ${
              activeSlide === i 
                ? 'w-2 h-2 bg-gray-700' 
                : 'w-1.5 h-1.5 bg-gray-300'
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>

      {/* Specification Pills */}
      <div className="flex items-center gap-2 px-4 mt-6 overflow-x-auto scrollbar-hide pb-1">
        <div className="bg-[#f8f9fa] rounded-xl p-2.5 min-w-[120px] flex-shrink-0 border border-gray-100 flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 mb-0.5">Noise Cancellation</p>
          <p className="text-[13px] font-bold text-gray-800">ENC</p>
        </div>
        <div className="bg-[#f8f9fa] rounded-xl p-2.5 min-w-[90px] flex-shrink-0 border border-gray-100 flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 mb-0.5">Runtime</p>
          <p className="text-[13px] font-bold text-gray-800">50 Hrs</p>
        </div>
        <div className="bg-[#f8f9fa] rounded-xl p-2.5 min-w-[120px] flex-shrink-0 border border-gray-100 flex flex-col justify-center">
          <p className="text-[11px] text-gray-500 mb-0.5">Bluetooth Range</p>
          <p className="text-[13px] font-bold text-gray-800">10m</p>
        </div>
        <div className="bg-[#f0fdf4] text-[#0C831F] rounded-xl px-4 py-2.5 flex-shrink-0 border border-green-200 flex flex-col items-center justify-center font-bold text-[12px] min-h-[58px]">
          View details
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
