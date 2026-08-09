import React from 'react';
import { ArrowUpRight, Bell, Sun, Moon, Settings, Search } from 'lucide-react';
import { OFFICIAL_NOTICES, FOR_YOU_LINKS } from '../../constants/index';

interface RightSidebarProps {
  onNavigate?: (view: string) => void;
  onCategorySelect?: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  onNavigate,
  onCategorySelect,
  searchTerm,
  onSearchChange,
  isDarkMode,
  setIsDarkMode
}) => {
  const notices = OFFICIAL_NOTICES || [];
  const partners = FOR_YOU_LINKS || [];

  const cardStyle = `transition-all duration-300 rounded-2xl p-5 border ${
    isDarkMode ? 'bg-[#07101f] border-slate-700 shadow-[0_16px_35px_rgba(2,10,25,0.35)]' : 'bg-white border-slate-200 shadow-[0_16px_35px_rgba(15,23,42,0.08)]'
  }`;

  const textPrimary = isDarkMode ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <aside className="hidden md:flex flex-col gap-5 sticky top-20 h-fit w-72">
      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-3">
          <Search size={16} className="text-sky-400" />
          <h3 className={`font-semibold text-sm ${textPrimary}`}>Search</h3>
        </div>
        <label className="w-full text-[10px] text-slate-500 mb-2 block">Search by title or description</label>
        <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${isDarkMode ? 'bg-[#08131f] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <Search size={16} className={isDarkMode ? 'text-slate-400' : 'text-slate-500'} />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search content"
            className={`w-full bg-transparent border-none outline-none text-sm ${isDarkMode ? 'text-slate-100 placeholder:text-slate-500' : 'text-slate-700 placeholder:text-slate-500'}`}
          />
        </div>
      </div>

      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-3">
          <Bell size={18} className="text-sky-400" />
          <h3 className={`font-semibold text-sm ${textPrimary}`}>Notices</h3>
        </div>
        <div className="flex flex-col gap-3">
          {notices.map((item) => (
            <div key={item.id} className={`flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
              <div>
                <h4 className={`text-sm font-medium leading-snug ${textSecondary}`}>{item.title}</h4>
                <span className="text-[10px] text-slate-500 mt-1 block">{item.category}</span>
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
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition-all ${
            isDarkMode 
              ? 'bg-[#08131f] border-slate-700 text-sky-300 hover:border-sky-400/30' 
              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <span className="flex items-center gap-2">
            {isDarkMode ? <Moon size={18} className="text-sky-300" /> : <Sun size={18} className="text-slate-700" />}
            <span className="text-sm font-medium uppercase tracking-[0.2em]">{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
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
              className="relative h-16 rounded-2xl overflow-hidden group border border-slate-700"
            >
              <img src={link.image.startsWith('http') ? link.image : `/media/${link.image}`} alt={link.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-colors" />
              {link.title && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium text-sm drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]">{link.title}</span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 px-2 space-y-2">
        <p>WakaMoe is a non-profit database for certain artist.</p>
        <p>All content belongs to the original rights holders.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
