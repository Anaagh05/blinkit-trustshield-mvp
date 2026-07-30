import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductImage from './components/ProductImage';
import ProductHeader from './components/ProductHeader';
import TrustShield from './components/TrustShield';
import AIReviewSummary from './components/AIReviewSummary';
import QuickAskButtons from './components/QuickAskButtons';
import StickyCartBar from './components/StickyCartBar';
import { productData } from './data/product';
import reviewsData from './data/reviews.json';
import { useAIInsights } from './hooks/useAIInsights';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [shieldActive, setShieldActive] = useState(false);
  const { aiResponse, loading, error, triggerAI } = useAIInsights(productData, reviewsData);

  const handleAddToCart = (qty) => {
    setCartCount((prev) => prev + qty);
  };

  const handleActivateShield = () => {
    setShieldActive(true);
    triggerAI();
  };

  // The TrustShield Button — highly visible, pulse effect, animated gradient
  const trustShieldButton = !shieldActive ? (
    <button
      onClick={handleActivateShield}
      className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-[#0C831F] rounded-xl p-0.5 shadow-lg active:scale-[0.98] transition-transform cursor-pointer animate-pulse-glow"
    >
      <div className="bg-white rounded-[10px] p-3 flex items-center justify-between h-full relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 shadow-inner">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-[14px] font-extrabold text-green-800 leading-tight mb-0.5">View TrustShield Report</p>
            <p className="text-[11px] text-green-600 font-bold">AI Powered Insights & Trust</p>
          </div>
        </div>
        <div className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-full border border-green-200">
          Check
        </div>
      </div>
      {/* Shimmer effect inside button border */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer opacity-50 z-0"></div>
    </button>
  ) : null;

  const productContent = (
    <>
      <Navbar cartCount={cartCount} />
      <main className="flex-1 pb-6 bg-white">
        <ProductImage
          imageSrc={productData.image}
          productName={productData.name}
          deliveryTime={productData.deliveryTime}
        />
        <ProductHeader product={productData} trustShieldSlot={trustShieldButton} />
        
        {/* TrustShield expanded content */}
        {shieldActive && (
          <div className="animate-fade-in-up mt-2 bg-gray-50/50 py-2 border-y border-gray-100">
            <div className="px-4 mb-2 flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-gray-900">TrustShield Report</h2>
              <button onClick={() => setShieldActive(false)} className="text-[10px] text-gray-500 underline font-medium">Close</button>
            </div>
            <TrustShield />
            <AIReviewSummary
              loading={loading}
              error={error}
              aiResponse={aiResponse}
              onSummarize={triggerAI}
            />
            <QuickAskButtons
              aiResponse={aiResponse}
              onSummarize={triggerAI}
            />
          </div>
        )}

        {/* Similar Products Placeholder to match Blinkit layout feel */}
        <div className="px-4 mt-6">
           <h3 className="text-[16px] font-bold text-gray-900 mb-4">Similar products</h3>
           <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
             <span className="text-gray-400 text-sm">Products carousel</span>
           </div>
        </div>
      </main>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center selection:bg-[#F8CB46] selection:text-black">
      
      {/* Desktop: "Mobile Preview" label + phone frame */}
      <div className="hidden md:flex flex-col items-center w-full h-screen py-3 overflow-hidden">
        
        {/* Phone Frame — scales to fit viewport */}
        <div className="relative flex-1 min-h-0">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-[60]"></div>
          
          {/* Phone body */}
          <div className="w-[380px] h-full bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-gray-800 overflow-hidden relative flex flex-col">
            {/* Status bar simulation */}
            <div className="h-7 bg-white flex items-center justify-between px-7 text-[10px] font-semibold text-gray-800 z-[55] shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
              </div>
            </div>

            {/* Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col scrollbar-hide bg-white">
              {productContent}
            </div>

            {/* Fixed Sticky Cart Bar at bottom of phone body */}
            <StickyCartBar
              price={productData.price}
              mrp={productData.mrp}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* Home indicator bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full z-50 pointer-events-none"></div>
        </div>

        {/* Bottom label */}
        <p className="mt-2 text-[10px] text-gray-400 shrink-0">
          Blinkit TrustShield · AI-Native MVP · Powered by Gemini 2.0 Flash
        </p>
      </div>

      {/* Mobile: Full-screen native experience (no frame) */}
      <div className="md:hidden w-full max-w-[480px] bg-white min-h-screen relative flex flex-col">
        {/* Scrollable App Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-hide">
          {productContent}
        </div>
        
        {/* Fixed Sticky Cart Bar at bottom */}
        <StickyCartBar
          price={productData.price}
          mrp={productData.mrp}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default App;
