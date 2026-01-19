import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { NAV_ITEMS } from '../../constants/index';
import { Language, translations } from '../../constants/translations';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isDarkMode: boolean;
  language: Language;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  searchTerm, 
  onSearchChange, 
  isDarkMode,
  language
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const t = translations[language];
  
  // Map view names to translations
  const getViewLabel = (view: string): string => {
    const viewMap: Record<string, keyof typeof t> = {
      'HOME': 'home',
      'GAME': 'game',
      'LIBRARY': 'library',
      'REF': 'reference',
      'VIDEO': 'video',
    };
    const key = viewMap[view];
    return key ? t[key] : view;
  };

  const updateIndicator = (itemName: string) => {
    const target = navRefs.current.get(itemName);
    if (target) {
      setIndicatorStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => updateIndicator(currentView), 50);
    return () => clearTimeout(timer);
  }, [currentView, language]);

  return (
    // shadow-sm
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 border-b backdrop-blur-md ${
      isDarkMode 
        ? 'bg-[#161B22]/90 border-[#30363D]' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-0 md:h-16 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
        
        {/* Logo */}
        <div className="hidden md:flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('HOME')}>
          <img src="media/alf.png" alt="Logo" className="w-8 h-8 object-contain flex-shrink-0 rounded-lg" />
          <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            WakaMoe
          </span>
        </div>
          
        {/* Navigation */}
        <nav 
          className={`relative w-full md:w-auto overflow-x-auto scrollbar-hide flex items-center gap-1 md:gap-4 border-b md:border-b-0 pb-2 md:pb-0 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-50'
          }`}
          onMouseLeave={() => updateIndicator(currentView)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item;
            return (
              <button
                key={item}
                ref={(el) => {
                  if (el) navRefs.current.set(item, el);
                  else navRefs.current.delete(item);
                }}
                onClick={() => onNavigate(item)}
                onMouseEnter={() => updateIndicator(item)}
                className={`
                  relative px-3 py-2 md:py-5 text-sm font-semibold transition-colors whitespace-nowrap flex-shrink-0 z-10
                  ${isActive 
                    ? 'text-blue-500' 
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-blue-400'}
                `}
              >
                {getViewLabel(item)}
                {/* Mobile Active Indicator */}
                {isActive && (
                  <span className={`absolute inset-0 rounded-lg -z-10 md:hidden ${
                    isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/50'
                  }`} />
                )}
              </button>
            );
          })}

          {/* Desktop Moving Indicator */}
          <span 
            className="absolute bottom-0 h-[3px] bg-blue-500 rounded-t-full transition-all duration-300 ease-in-out hidden md:block"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              pointerEvents: 'none'
            }}
          />
        </nav>

        {/* Search */}
        <div className="w-full md:w-auto">
          <div className={`flex items-center rounded-full px-4 py-2 transition-all w-full border ${
            isDarkMode 
              ? 'bg-[#0D1117] border-[#30363D] focus-within:border-blue-500/50' 
              : 'bg-gray-100 border-transparent focus-within:bg-white focus-within:border-blue-100'
          }`}>
            <Search size={18} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            <input 
              type="text" 
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`bg-transparent border-none outline-none text-sm ml-2 w-full md:w-48 lg:w-64 ${
                isDarkMode ? 'text-gray-200 placeholder:text-gray-600' : 'text-gray-800'
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
