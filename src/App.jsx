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
  const { aiResponse, loading, error, triggerAI } = useAIInsights(productData, reviewsData);

  const handleAddToCart = (qty) => {
    setCartCount((prev) => prev + qty);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center selection:bg-[#F8CB46] selection:text-black">
      {/* Mobile Viewport Simulation Container (Max 480px Centered) */}
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-[var(--shadow-phone)] relative pb-32 flex flex-col">
        {/* Top Sticky Navigation */}
        <Navbar cartCount={cartCount} />

        {/* Main PDP Content */}
        <main className="flex-1">
          {/* Product Hero Image */}
          <ProductImage
            imageSrc={productData.image}
            productName={productData.name}
            deliveryTime={productData.deliveryTime}
          />

          {/* Product Title, Pricing & Highlights */}
          <ProductHeader product={productData} />

          {/* Blinkit TrustShield Protection Banner */}
          <TrustShield />

          {/* AI Review Summarizer & Pros/Cons */}
          <AIReviewSummary
            loading={loading}
            error={error}
            aiResponse={aiResponse}
            onSummarize={triggerAI}
          />

          {/* AI Quick-Ask Interactive Buttons */}
          <QuickAskButtons
            aiResponse={aiResponse}
            onSummarize={triggerAI}
          />
        </main>

        {/* Sticky Bottom Cart Action Bar */}
        <StickyCartBar
          price={productData.price}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default App;
