import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_CAROUSEL } from '../../constants/index';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel: React.FC = () => {
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

  return (
    <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden mb-0 bg-[#070A10] group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/95 via-transparent to-[#02040a]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_34%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_30%)] pointer-events-none" />

      {MOCK_CAROUSEL.map((item, idx) => {
        const isActive = currentIndex === idx;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}
          >
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full h-full"
            >
              <img 
                src={item.image.startsWith('http') ? item.image : `/media/${item.image}`} 
                alt={item.title} 
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'scale-[1.06]' : 'scale-[1.12]'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x700?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {item.title && (
                <div className="relative z-20 flex h-full flex-col justify-end p-6 md:p-10">
                  <p className="text-xs text-sky-300/80 mb-2">Featured</p>
                  <h2 className={`text-white text-3xl md:text-5xl font-black leading-tight ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                    {item.title}
                  </h2>
                </div>
              )}
            </a>
          </div>
        );
      })}

      {/* Control Button */}
      <button 
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {MOCK_CAROUSEL.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;