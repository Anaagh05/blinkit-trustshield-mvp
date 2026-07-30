import React, { useState } from 'react';

const StickyCartBar = ({ price, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
      triggerBounce();
    }
  };

  const increaseQty = () => {
    if (qty < 10) {
      setQty(qty + 1);
      triggerBounce();
    } else {
      alert("Maximum 10 units per order.");
    }
  };

  const handleAdd = () => {
    onAddToCart(qty);
    triggerBounce();
    setQty(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[var(--color-border)] shadow-[var(--shadow-sticky)]">
      <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-white border border-green-600 rounded-lg h-11 w-24 overflow-hidden shrink-0 shadow-2xs">
          <button 
            onClick={decreaseQty}
            className="w-1/3 h-full flex items-center justify-center text-green-700 font-bold text-lg active:bg-green-100 transition-colors cursor-pointer"
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-1/3 h-full flex items-center justify-center text-green-800 font-bold text-sm bg-green-50">
            {qty}
          </span>
          <button 
            onClick={increaseQty}
            className="w-1/3 h-full flex items-center justify-center text-green-700 font-bold text-lg active:bg-green-100 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button with Micro-bounce animation */}
        <button 
          onClick={handleAdd}
          className={`flex-1 bg-[#F8CB46] hover:bg-[#e5b93a] text-gray-900 h-11 rounded-lg font-bold text-sm shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isBouncing ? 'animate-bounce-subtle' : ''
          }`}
        >
          <span>🛒</span> Add {qty} item{qty > 1 ? 's' : ''} • ₹{price * qty}
        </button>

      </div>
    </div>
  );
};

export default StickyCartBar;
