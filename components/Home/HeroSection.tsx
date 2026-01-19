import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_CAROUSEL } from '../../constants/index';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../../constants/translations';

interface HeroCarouselProps {
  language?: Language;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ language = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!MOCK_CAROUSEL || MOCK_CAROUSEL.length === 0) return null;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_CAROUSEL.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_CAROUSEL.length) % MOCK_CAROUSEL.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Helper function to get localized text
  const getLocalizedText = (text: string | { en: string; ko: string }): string => {
    if (typeof text === 'string') return text;
    return text[language];
  };

  return (
    <div className="w-full relative h-[250px] md:h-[380px] rounded-2xl overflow-hidden group bg-gray-200 dark:bg-[#161B22] mb-6 border dark:border-gray-800 border-gray-100">
      
      {/* 슬라이드 트랙 */}
      <div 
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          transform: `translateX(-${currentIndex * (100 / MOCK_CAROUSEL.length)}%)`,
          width: `${MOCK_CAROUSEL.length * 100}%` 
        }}
      >
        {MOCK_CAROUSEL.map((item) => (
          <div
            key={item.id}
            className="h-full flex-shrink-0"
            style={{ width: `${100 / MOCK_CAROUSEL.length}%` }}
          >
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full h-full"
            >
              <img 
                src={item.image.startsWith('http') ? item.image : `/media/${item.image}`} 
                alt={getLocalizedText(item.title)} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                }}
              />
              {/* 제목이 있을 경우에만 그라데이션 및 텍스트 표시 */}
              {item.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                  <h2 className="text-white text-xl md:text-3xl font-bold mb-2 drop-shadow-md">
                    {getLocalizedText(item.title)}
                  </h2>
                </div>
              )}
            </a>
          </div>
        ))}
      </div>

      {/* 컨트롤 버튼 */}
      <button 
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md border border-white/10"
      >
        <ChevronRight size={24} />
      </button>

      {/* 인디케이터 (점) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {MOCK_CAROUSEL.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;