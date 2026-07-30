import React, { useState } from 'react';

const ProductImage = ({ imageSrc, productName, deliveryTime }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative bg-gray-100 flex flex-col items-center pt-4 pb-6 border-b border-[var(--color-border)]">
      {/* ⚡ Delivery tag overlay */}
      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-200 flex items-center gap-1 z-10">
        <span className="text-yellow-500 text-sm">⚡</span>
        <span className="text-xs font-bold text-gray-800">{deliveryTime}</span>
      </div>

      <div className="w-64 h-64 flex items-center justify-center mt-6 relative">
        {/* Edge Case 4.10: Product image fails to load */}
        {imgError ? (
          <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-center p-4">
            <span className="text-gray-500 text-sm font-medium">{productName}<br/>(Image Unavailable)</span>
          </div>
        ) : (
          <img 
            src={imageSrc} 
            alt={productName}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-lg"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Gallery dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ProductImage;
