import React, { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS } from '../../constants/index';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, isDarkMode }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const getViewLabel = (view: string): string => {
    const viewMap: Record<string, string> = {
      HOME: 'Home',
      GAME: 'Game',
      LIBRARY: 'Library',
      REF: 'Reference',
      VIDEO: 'Video',
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
    <header className="relative sticky top-4 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className={`relative overflow-hidden rounded-full border border-white/10 bg-[#08121d]/70 backdrop-blur-xl ${
          isDarkMode ? 'ring-1 ring-sky-500/10' : 'ring-1 ring-slate-900/5'
        }`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.07),transparent_32%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('HOME')}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-slate-900/90">
                <img src="media/alf.png" alt="Logo" className="w-9 h-9 object-contain rounded-full" />
              </div>
              <h1 className="text-2xl font-black text-white leading-tight">WAKAMOE</h1>
            </div>

            <nav className="relative flex flex-wrap items-center gap-1 md:gap-2">
              <div ref={(el) => { navContainerRef.current = el; }} className="relative flex items-center gap-2 z-0">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentView === item;
                  return (
                    <button
                      key={item}
                      ref={(el) => { if (el) navRefs.current.set(item, el); else navRefs.current.delete(item); }}
                      onClick={() => onNavigate(item)}
                      onMouseEnter={() => updateIndicator(item)}
                      onMouseLeave={() => updateIndicator(currentView)}
                      className={`relative px-3 py-2 font-semibold text-sm whitespace-nowrap flex-shrink-0 rounded-full z-10 ${
                        isActive
                          ? 'text-white bg-sky-500/15 border border-sky-500/20 shadow-sm'
                          : isDarkMode
                          ? 'text-slate-300 hover:text-white hover:bg-white/5'
                          : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {getViewLabel(item)}
                    </button>
                  );
                })}

                <span
                  className="absolute left-0 top-0 h-full rounded-full bg-sky-500/12 hidden md:block"
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
