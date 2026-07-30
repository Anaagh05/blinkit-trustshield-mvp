import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 'genuine',
    label: '🛡️ Is this genuine?',
    fallback: 'boAt is an authorized brand on Blinkit with a verified supply chain. Products come directly from official distributors with full warranty.'
  },
  {
    id: 'returns',
    label: "📦 What if I don't like it?",
    fallback: 'Blinkit offers an easy doorstep return policy within 48 hours. No questions asked, with same-day pickup scheduling.'
  },
  {
    id: 'worthIt',
    label: '💰 Why is this worth it?',
    fallback: 'At ₹1,499 with 10-minute doorstep delivery, you get instant access to quality audio without waiting days for delivery.'
  }
];

const QuickAskButtons = ({ aiResponse, onSummarize }) => {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    // If AI hasn't been fetched yet, trigger AI fetch first or reveal fallback
    if (!aiResponse) {
      onSummarize();
    }
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white p-4 my-2 mx-4 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
        <span>❓</span> Quick Questions
      </h3>

      {/* Tappable Pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUESTIONS.map(q => {
          const isActive = activeId === q.id;
          return (
            <button
              key={q.id}
              onClick={() => handleToggle(q.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm scale-[0.98]'
                  : 'bg-purple-50/60 text-purple-950 border-purple-200 hover:bg-purple-100/70'
              }`}
            >
              {q.label}
            </button>
          );
        })}
      </div>

      {/* Revealed Answer Box */}
      {activeId && (
        <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-lg animate-slide-down">
          <div className="flex items-start gap-2">
            <span className="text-sm shrink-0">💡</span>
            <div>
              <h4 className="text-xs font-bold text-purple-950 mb-0.5">
                {QUESTIONS.find(q => q.id === activeId)?.label.replace(/^[^a-zA-Z]+/, '')}
              </h4>
              <p className="text-xs text-gray-800 leading-relaxed">
                {aiResponse?.quickAsk?.[activeId] || QUESTIONS.find(q => q.id === activeId)?.fallback}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAskButtons;
