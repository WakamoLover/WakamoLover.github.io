import React, { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS } from '../../constants/index';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const getViewLabel = (view: string): string => {
    const viewMap: Record<string, string> = {
      HOME: 'Home',
      GAME: 'Game',
      LIBRARY: 'Library',
      REF: 'Reference',
      VIDEO: 'Media',
    };
    return viewMap[view] || view;
  };

  const updateIndicator = (itemName: string) => {
    const target = navRefs.current.get(itemName);
    const container = navContainerRef.current;
    if (target && container) {
      const left = target.offsetLeft - container.offsetLeft;
      setIndicatorStyle({ left, width: target.offsetWidth, opacity: 1 });
    }
  };

  useEffect(() => {
    const onResize = () => updateIndicator(currentView);
    window.addEventListener('resize', onResize);
    const t = setTimeout(() => updateIndicator(currentView), 50);
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, [currentView]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3">
        <div className="relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0" onClick={() => onNavigate('HOME')}>
              <img src="media/alf.png" alt="Logo" className="w-9 h-9 md:w-11 md:h-11 object-cover rounded-full shrink-0" />
              <h1 className="text-lg md:text-2xl font-black text-slate-900 leading-tight">WAKAMOE</h1>
            </div>

            <nav className="relative min-w-0 overflow-x-auto scrollbar-hide">
              <div ref={(el) => { navContainerRef.current = el; }} className="relative flex items-center gap-0.5 md:gap-1 z-0 w-max">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentView === item;
                  return (
                    <button
                      key={item}
                      ref={(el) => { if (el) navRefs.current.set(item, el); else navRefs.current.delete(item); }}
                      onClick={() => onNavigate(item)}
                      className={`relative px-2.5 py-2 md:px-3.5 font-bold text-xs md:text-sm whitespace-nowrap flex-shrink-0 rounded-full z-10 transition-colors bg-transparent ${
                        isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {getViewLabel(item)}
                    </button>
                  );
                })}

                <span
                  className="absolute left-0 top-0 h-full rounded-full bg-sky-500/10 border border-sky-500/20 hidden md:block transition-all duration-300 ease-out"
                  style={{
                    transform: `translateX(${indicatorStyle.left}px)`,
                    width: `${indicatorStyle.width}px`,
                    opacity: indicatorStyle.opacity,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;