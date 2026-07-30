import React from 'react';

const ProductHeader = ({ product, trustShieldSlot }) => {
  return (
    <div className="bg-white px-4 py-2 shrink-0">
      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <div className="flex gap-[2px]">
          {[1,2,3,4].map(i => <span key={i} className="text-[#F8CB46] text-[10px]">★</span>)}
          <span className="text-[#F8CB46] text-[10px] opacity-40">★</span>
        </div>
        <span className="text-[11px] text-gray-500 font-medium ml-0.5">17,086</span>
      </div>
      
      {/* Title */}
      <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight mb-2.5 tracking-tight">
        {product.name} (Active Black)
      </h1>
      
      {/* Unit & Stock */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[13px] font-medium text-gray-800">1 unit</span>
        <div className="flex items-center bg-gray-100/80 px-2.5 py-1 rounded-full border border-gray-200/50">
           <div className="w-4 h-2.5 bg-gray-300 rounded-[2px] mr-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-gray-500"></div>
           </div>
           <span className="text-[11px] text-gray-600 font-medium">4 left</span>
        </div>
      </div>

      {/* Pricing row */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-[24px] font-extrabold text-[#1a1a1a] tracking-tight">₹{product.price}</span>
        <span className="text-[13px] text-gray-400 font-medium">MRP <span className="line-through">₹{product.mrp}</span></span>
      </div>
      <p className="text-[10px] text-gray-400 mb-4">Inclusive of all taxes</p>

      {/* Inject TrustShield Button Here so it's above the fold */}
      {trustShieldSlot && (
        <div className="mb-4">
          {trustShieldSlot}
        </div>
      )}

      {/* Offers Block */}
      <div className="bg-[#fcf7f9] rounded-2xl p-3.5 mb-4 flex items-center justify-between border border-[#faeef2]">
        <div className="flex items-center gap-3.5">
           <div className="w-10 h-10 rounded-xl bg-[#911f4d] text-white flex items-center justify-center font-bold text-xl shadow-sm">
             A
           </div>
           <div>
             <p className="text-[14px] font-bold text-gray-900 mb-0.5">Buy at ₹990</p>
             <p className="text-[12px] text-gray-500">Apply Code: AXISNEO</p>
           </div>
        </div>
        <div className="text-[#0C831F] text-[12px] font-bold cursor-pointer pr-1">
          +2 offers
        </div>
      </div>

      {/* Brand Block */}
      <div className="bg-white rounded-2xl p-3.5 mb-4 flex items-center justify-between border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3.5">
           <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center bg-white text-[10px] font-bold text-gray-800 shadow-sm">
             boAt
           </div>
           <div>
             <p className="text-[14px] font-bold text-gray-900 mb-0.5">boAt</p>
             <p className="text-[12px] text-gray-500">Explore all products</p>
           </div>
        </div>
        <div className="text-gray-400 cursor-pointer pr-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
             <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Native Trust Badges (Replacement & Warranty) */}
      <div className="flex gap-2 mb-4">
        {/* Replacement Badge */}
        <div className="flex-1 flex items-center justify-between bg-[#f8f9fa] border border-gray-100 rounded-xl p-3 cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">7 days only<br/>replacement</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 shrink-0">
             <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Warranty Badge */}
        <div className="flex-1 flex items-center justify-between bg-[#f8f9fa] border border-gray-100 rounded-xl p-3 cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span className="text-[11px] font-bold text-gray-800 leading-tight">1 Year<br/>Warranty</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 shrink-0">
             <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
    </div>
  );
};

export default ProductHeader;
