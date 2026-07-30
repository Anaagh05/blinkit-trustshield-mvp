import React, { useState } from 'react';

const StickyCartBar = ({ price, mrp, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };

  const handleAdd = () => {
    onAddToCart(qty);
    triggerBounce();
  };

  return (
    <div className="w-full bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] shrink-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left Info */}
        <div className="flex flex-col">
          <span className="text-[12px] text-gray-500 font-medium mb-0.5">1 unit</span>
          <div className="flex items-baseline gap-1.5 mb-0.5">
            <span className="text-[16px] font-bold text-gray-900 tracking-tight">₹{price}</span>
            <span className="text-[12px] text-gray-400 font-medium">MRP <span className="line-through">₹{mrp}</span></span>
          </div>
          <span className="text-[10px] text-gray-400">Inclusive of all taxes</span>
        </div>

        {/* Right Button */}
        <button 
          onClick={handleAdd}
          className={`bg-[#318616] text-white h-[44px] px-8 rounded-xl font-bold text-[14px] active:scale-[0.98] transition-transform flex items-center justify-center shadow-sm ${
            isBouncing ? 'animate-bounce-subtle' : ''
          }`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default StickyCartBar;
