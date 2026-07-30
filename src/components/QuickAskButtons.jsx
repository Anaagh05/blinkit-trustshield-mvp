import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 'genuine',
    icon: '🛡️',
    label: 'Is this genuine?',
    fallback: 'boAt is an authorized brand on Blinkit with a verified supply chain. Products come directly from official distributors with full warranty.'
  },
  {
    id: 'returns',
    icon: '📦',
    label: "What if I don't like it?",
    fallback: 'Blinkit offers an easy doorstep return policy within 48 hours. No questions asked, with same-day pickup scheduling.'
  },
  {
    id: 'worthIt',
    icon: '💰',
    label: 'Why is this worth it?',
    fallback: 'At ₹1,499 with 10-minute doorstep delivery, you get instant access to quality audio without waiting days for delivery.'
  }
];

const QuickAskButtons = ({ aiResponse, onSummarize }) => {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    if (!aiResponse) onSummarize();
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <div className="mx-3 my-2 bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
      <div className="px-3 pt-3 pb-2">
        <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
          ❓ Quick Questions
        </h3>
      </div>

      <div className="px-3 pb-3">
        {/* Question Buttons */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {QUESTIONS.map(q => {
            const isActive = activeId === q.id;
            return (
              <button
                key={q.id}
                onClick={() => handleToggle(q.id)}
                className={`px-2.5 py-1.5 rounded-full text-[10px] font-semibold transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-[#0C831F] text-white border-[#0C831F] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 active:scale-[0.97]'
                }`}
              >
                {q.icon} {q.label}
              </button>
            );
          })}
        </div>

        {/* Answer Card */}
        {activeId && (
          <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg animate-slide-down">
            <div className="flex items-start gap-2">
              <span className="text-sm shrink-0">💡</span>
              <div>
                <p className="text-[10px] font-bold text-gray-900 mb-0.5">
                  {QUESTIONS.find(q => q.id === activeId)?.label}
                </p>
                <p className="text-[10px] text-gray-600 leading-relaxed">
                  {aiResponse?.quickAsk?.[activeId] || QUESTIONS.find(q => q.id === activeId)?.fallback}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickAskButtons;
