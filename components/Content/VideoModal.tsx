import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  const getEmbedSrc = (url: string) => {
    if (!url) return "";
    
    try {
      const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&origin=${encodeURIComponent(window.location.origin)}&rel=0`;
      }

      const biliMatch = url.match(/(BV[a-zA-Z0-9]+)/);
      if (biliMatch) {
        return `https://player.bilibili.com/player.html?bvid=${biliMatch[1]}&autoplay=1&high_quality=1&danmaku=0`;
      }

      const nicoMatch = url.match(/sm(\d+)/);
      if (nicoMatch) {
        return `https://embed.nicovideo.jp/watch/${nicoMatch[0]}?autoplay=1`;
      }

      if (url.includes('/embed/') || url.includes('player.html') || url.includes('embed.nicovideo.jp')) {
        return url;
      }
    } catch (e) {
      console.error("Video URL parsing error:", e);
    }
    return url;
  };

  const embedSrc = getEmbedSrc(videoUrl);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all" 
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20"
        >
          <X size={24} />
        </button>

        <div className="aspect-video w-full bg-black">
          {embedSrc ? (
            <iframe 
              src={embedSrc} 
              title="Video Player" 
              className="w-full h-full"
              frameBorder="0"
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Invalid Video URL
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;