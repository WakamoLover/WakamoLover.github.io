import React from 'react';
import { Search, X } from 'lucide-react';
import { PageId } from '../../types';

const AREA_TABS = [
  { id: PageId.PAGE1, label: 'Game' },
  { id: PageId.PAGE2, label: 'Creator' },
  { id: PageId.PAGE3, label: 'Media' },
  { id: PageId.PAGE4, label: 'Reference' },
];

interface HeaderProps {
  currentView: PageId;
  onNavigate: (view: PageId) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, searchTerm, onSearchChange }) => {
  return (
    <header className="floating-glass-header no-invert sticky top-3 z-50 mx-3 sm:mx-5 lg:mx-8">
      <div className="relative grid grid-cols-1 items-center gap-x-3 gap-y-2 px-4 py-2 sm:px-6 2xl:min-h-16 2xl:grid-cols-[minmax(0,1fr)_minmax(12rem,20rem)] 2xl:gap-6 2xl:px-8 2xl:py-0">
        <div className="flex min-w-0 items-center gap-3 2xl:gap-7">
          <button
            type="button"
            onClick={() => onNavigate(PageId.PAGE1)}
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
                    isActive ? 'header-nav-link--active-dark text-white' : 'text-slate-100 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`header-nav-indicator absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-[var(--brand-accent)] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        <label className="header-search col-span-1 col-start-1 row-start-2 flex h-10 w-full min-w-0 max-w-xs justify-self-end items-center gap-2 rounded-full border px-3 transition-colors 2xl:col-start-2 2xl:row-start-1 2xl:w-full 2xl:max-w-xs 2xl:px-4">
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

      </div>
    </header>
  );
};

export default Header;