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
    <header className="sticky top-4 z-50 w-full">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="relative overflow-hidden rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-xl ring-1 ring-slate-900/5">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('HOME')}>
              <img src="media/alf.png" alt="Logo" className="w-11 h-11 object-cover rounded-full shrink-0" />
              <h1 className="text-2xl font-black text-slate-900 leading-tight">WAKAMOE</h1>
            </div>

            <nav className="relative flex flex-wrap items-center gap-1 md:gap-2">
              <div ref={(el) => { navContainerRef.current = el; }} className="relative flex items-center gap-1 z-0">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentView === item;
                  return (
                    <button
                      key={item}
                      ref={(el) => { if (el) navRefs.current.set(item, el); else navRefs.current.delete(item); }}
                      onClick={() => onNavigate(item)}
                      onMouseEnter={() => updateIndicator(item)}
                      onMouseLeave={() => updateIndicator(currentView)}
                      className={`relative px-3.5 py-2 font-bold text-sm whitespace-nowrap flex-shrink-0 rounded-full z-10 transition-colors bg-transparent ${
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