import React from 'react';

const ProductHeader = ({ product }) => {
  return (
    <div className="bg-white px-4 py-4 border-b border-[var(--color-border)]">
      {/* Title & Brand */}
      <h1 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h1>
      
      {/* Ratings */}
      <div className="flex items-center gap-1.5 mt-2">
        <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-xs font-semibold text-gray-800">
          {product.rating} <span className="text-yellow-500 ml-0.5">★</span>
        </div>
        <span className="text-xs text-gray-500">{product.reviewCount} ratings</span>
      </div>

      {/* Pricing */}
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
        <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
          {product.discount}% OFF
        </span>
      </div>
      <p className="text-[10px] text-gray-500 mt-1">(Inclusive of all taxes)</p>

      {/* Highlights Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {product.highlights.map((highlight, idx) => (
          <span 
            key={idx} 
            className="text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md"
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductHeader;
