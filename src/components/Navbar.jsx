import React from 'react';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Edge Case 4.8: Back button placeholder */}
        <button 
          onClick={() => alert("You're on the product page (Demo)")}
          className="p-1 rounded-full active:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Edge Case 4.9: Search button placeholder */}
        <button 
          onClick={() => alert("Search coming soon!")}
          className="p-2 rounded-full active:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M5.4 5H21L19 14H7.2M5.4 5L7.2 14M7.2 14L6 16.5C5.8 16.9 6.1 17.5 6.6 17.5H19M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21C18 20.4477 18.4477 20 19 20C19.5523 20 20 20.4477 20 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#0C831F] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
