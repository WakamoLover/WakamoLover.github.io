import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, Bell, Sun, Moon, Volume2, VolumeX, Settings } from 'lucide-react';
import { OFFICIAL_NOTICES, FOR_YOU_LINKS, SIDEBAR_CAROUSEL } from '../../constants/index';

interface RightSidebarProps {
  onNavigate?: (view: string) => void;
  onCategorySelect?: (category: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  onNavigate,
  onCategorySelect,
  isDarkMode,
  setIsDarkMode,
  isMuted,
  setIsMuted
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const notices = OFFICIAL_NOTICES || [];
  const partners = FOR_YOU_LINKS || [];
  const carouselItems = SIDEBAR_CAROUSEL || [];

  const getImageSrc = (item: any) => {
    if (!item.image) return 'https://placehold.co/300x150';
    return item.image.startsWith('http') ? item.image : `/media/${item.image}`;
  };

  const nextSlide = useCallback(() => {
    if (carouselItems.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }
  }, [carouselItems.length]);

  useEffect(() => {
    if (carouselItems.length === 0) return;

    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [carouselItems.length, nextSlide]);

  const cardStyle = `transition-colors duration-300 rounded-lg p-5 border ${
    isDarkMode ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-gray-100'
  }`;

  const textPrimary = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-700';

  return (
    <aside className="hidden md:flex flex-col gap-5 sticky top-20 h-fit w-80">
      
      {/* 1. Official Notices */}
      <div className={cardStyle}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-bold flex items-center gap-2 ${textPrimary}`}>
            <Bell size={18} className="text-blue-500" />
            Official Notices
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {notices.map((item) => (
            <div key={item.id} className={`flex items-start gap-3 group cursor-pointer pb-2 border-b last:border-0 last:pb-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-50'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className={`text-sm font-medium group-hover:text-blue-500 line-clamp-2 leading-snug ${textSecondary}`}>{item.title}</h4>
                <span className="text-[10px] text-gray-400 mt-0.5 block">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. System Settings */}
      <div className={cardStyle}>
        <div className="flex items-center gap-2 mb-4">
          <Settings size={16} className="text-gray-400" />
          <h3 className={`font-bold text-sm tracking-wide ${textPrimary}`}>System Settings</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
              isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-yellow-400' 
              : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-blue-200 hover:bg-blue-50'
            }`}
          >
            {isDarkMode ? <Moon size={20} fill="currentColor" /> : <Sun size={20} />}
            <span className="text-[10px] font-bold uppercase">{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
              !isMuted 
              ? 'bg-blue-600/10 border-blue-500/50 text-blue-500' 
              : isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-red-200 hover:bg-red-50'
            }`}
          >
            {!isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span className="text-[10px] font-bold uppercase">{!isMuted ? 'BGM On' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* 3. Mini Carousel Widget */}
      <div className={`w-full h-32 rounded-lg overflow-hidden relative border ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-gray-200'}`}>
        <div 
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / carouselItems.length)}%)`,
            width: `${carouselItems.length * 100}%`
          }}
        >
          {carouselItems.map((item) => (
            <a 
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full relative flex-shrink-0 block cursor-pointer"
              style={{ width: `${100 / carouselItems.length}%` }}
            >
              <img 
                src={getImageSrc(item)} 
                alt={item.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                   console.error(`이미지 로드 실패: ${getImageSrc(item)}`);
                   (e.target as HTMLImageElement).src = 'https://placehold.co/300x150?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                 <span className="text-white font-bold text-xs truncate">{item.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 4. Partner Static Links */}
      <div className={cardStyle}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-bold text-sm tracking-wide ${textPrimary}`}>For you</h3>
        </div>
        <div className="flex flex-col gap-3">
          {partners.map(link => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank"
              rel="noreferrer" 
              className={`relative h-16 rounded-xl overflow-hidden group border ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}
            >
              <img src={link.image.startsWith('http') ? link.image : `/media/${link.image}`} alt={link.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-sm drop-shadow-md flex items-center gap-1">
                  {link.title} <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400 px-2 space-y-2">
        <p>WakaMoe is a non-profit fan database for artistic reference.</p>
        <p>All content is the trademark and copyright of certain anime game companies and their respective holders.</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
