import React, { useState } from 'react';
import { Moon, Search, Sun, X } from 'lucide-react';

const AREA_TABS = [
  { id: 'GAME', label: 'Game' },
  { id: 'CREATOR', label: 'Creator' },
  { id: 'MEDIA', label: 'Media' },
  { id: 'REF', label: 'Reference' },
];

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, searchTerm, onSearchChange }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    setIsDark((previous) => {
      const next = !previous;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <header className="floating-glass-header no-invert sticky top-3 z-50 mx-3 sm:mx-5 lg:mx-8">
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-2 sm:px-6 2xl:min-h-16 2xl:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)_auto] 2xl:gap-6 2xl:px-8 2xl:py-0">
        <div className="flex min-w-0 items-center gap-3 2xl:gap-7">
          <button
            type="button"
            onClick={() => onNavigate('GAME')}
            className="header-brand flex shrink-0 items-center gap-2 text-left"
            aria-label="WakaMoe Game"
          >
            <img src="/media/favicon.png" alt="" className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9" />
            <span className="text-base font-black leading-none sm:text-2xl">WAKAMOE</span>
          </button>

          <nav aria-label="Illustration areas" className="scrollbar-hide flex min-w-0 items-center gap-3 overflow-x-auto 2xl:gap-6">
            {AREA_TABS.map(({ id, label }) => {
              const isActive = currentView === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`header-nav-link relative flex h-12 shrink-0 items-center px-0.5 text-xs font-bold transition-colors sm:text-sm 2xl:h-16 ${
                    isDark
                      ? isActive
                        ? 'header-nav-link--active-dark text-white'
                        : 'text-slate-100 hover:text-white'
                      : isActive
                        ? 'text-[var(--brand-accent)]'
                        : 'text-slate-800 hover:text-[var(--brand-accent)]'
                  }`}
                >
                  {label}
                  <span className={`header-nav-indicator absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--brand-accent)] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        <label className="header-search col-span-2 col-start-1 row-start-2 flex h-10 w-full min-w-0 max-w-xs justify-self-end items-center gap-2 rounded-full border px-3 transition-colors 2xl:col-span-1 2xl:col-start-2 2xl:row-start-1 2xl:w-full 2xl:max-w-xs 2xl:px-4">
          <Search size={18} className="shrink-0" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search"
            aria-label="Search"
            className="search-input header-search__input w-full min-w-0 bg-transparent text-sm outline-none"
          />
          {searchTerm && (
            <button type="button" onClick={() => onSearchChange('')} aria-label="Clear search" className="header-search__clear shrink-0">
              <X size={16} />
            </button>
          )}
        </label>

        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`header-theme-toggle col-start-2 row-start-1 flex h-10 w-10 items-center justify-center justify-self-end rounded-full transition-colors 2xl:col-start-3 ${isDark ? 'header-theme-toggle--dark' : ''}`}
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;