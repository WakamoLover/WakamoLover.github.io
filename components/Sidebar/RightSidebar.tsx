import React, { useState } from 'react';
import { ArrowUpRight, Bell, Sun, Moon, Settings, Search, X } from 'lucide-react';
import { OFFICIAL_NOTICES, FOR_YOU_LINKS } from '../../constants/index';

interface RightSidebarProps {
  onNavigate?: (view: string) => void;
  onCategorySelect?: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  searchTerm,
  onSearchChange
}) => {
  const notices = OFFICIAL_NOTICES || [];
  const partners = FOR_YOU_LINKS || [];

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const cardStyle = "transition-all duration-300 rounded-2xl p-5 border bg-white border-slate-200 shadow-sm";
  const textPrimary = "text-slate-900";
  const textSecondary = "text-slate-600";

  return (
    <aside className="hidden md:flex flex-col gap-5 sticky top-20 h-fit w-72">
      <div className="group flex items-center gap-3 rounded-full border px-4 py-2.5 transition-colors bg-[#eff3f4] border-transparent focus-within:bg-white focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
        <Search
          size={18}
          className="transition-colors shrink-0 text-slate-500 group-focus-within:text-sky-500"
        />

        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-500"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="flex items-center justify-center p-0.5 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors shrink-0"
          >
            <X size={12} />
          </button>
        )}
      </div>

      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-3">
          <Bell size={18} className="text-sky-400" />
          <h3 className={`font-semibold text-sm ${textPrimary}`}>Notices</h3>
        </div>
        <div className="flex flex-col gap-3">
          {notices.map((item) => (
            <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
              <div>
                <h4 className={`text-sm font-medium leading-snug ${textSecondary}`}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-3">
          <Settings size={16} className="text-sky-400" />
          <h3 className={`font-semibold text-sm ${textPrimary}`}>Theme</h3>
        </div>
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition-all bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
        >
          <span className="flex items-center gap-2">
            {isDark ? <Moon size={18} className="text-sky-500" /> : <Sun size={18} className="text-amber-500" />}
            <span className="text-sm font-medium uppercase tracking-[0.2em]">{isDark ? 'Dark mode' : 'Light mode'}</span>
          </span>
          <span className="text-xs text-slate-400">Toggle</span>
        </button>
      </div>

      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-3">
          <ArrowUpRight size={16} className="text-sky-400" />
          <h3 className={`font-semibold text-sm ${textPrimary}`}>For you</h3>
        </div>
        <div className="flex flex-col gap-3">
          {partners.map(link => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank"
              rel="noreferrer" 
              className="relative h-16 rounded-2xl overflow-hidden group border border-slate-200"
            >
              <img src={link.image.startsWith('http') ? link.image : `/media/${link.image}`} alt={link.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform" />
              {link.title && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{link.title}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 px-2 space-y-2">
        <p>WakaMoe is a non-profit database.</p>
        <p>All content belongs to the original rights holders.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;