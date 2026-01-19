import React, { useState } from 'react';
import { ContentType } from '../../types';
import { Play, ExternalLink } from 'lucide-react';

interface PostCardProps {
  post: any;
  viewMode: string;
  isDarkMode: boolean;
  onVideoClick?: (url: string) => void;
  onImageClick?: (url: string) => void;
}

const Chip: React.FC<{ label: string; url?: string; isDarkMode: boolean }> = ({ label, url, isDarkMode }) => {
  const commonClasses = `
    text-[11px] px-2 py-0.5 rounded-md transition-all 
    inline-flex items-center whitespace-nowrap flex-shrink-0 
    border
  `;

  if (url) {
    return (
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${commonClasses} ${
          isDarkMode 
            ? 'bg-blue-900/30 text-blue-400 border-blue-800/50 hover:bg-blue-900/50' 
            : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
  }
  return (
    <span className={`${commonClasses} ${
      isDarkMode 
        ? 'bg-[#21262D] text-gray-400 border-[#30363D]' 
        : 'bg-gray-100 text-gray-500 border-transparent'
    }`}>
        {label}
    </span>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, viewMode, isDarkMode, onVideoClick, onImageClick }) => {
  const [imageError, setImageError] = useState(false);
  
  const displayImage = post.thumbnail || post.coverImage;
  
  // 각 타입별로 링크 우선순위 설정
  let contentUrl = '';
  if (post.type === ContentType.VIDEO) {
    contentUrl = post.videoUrl || post.originalUrl || '';
  } else if (post.type === ContentType.REF || post.type === ContentType.IMAGE) {
    contentUrl = post.externalLink || post.originalUrl || '';
  } else if (post.type === ContentType.GAME) {
    contentUrl = '';
  } else {
    contentUrl = post.originalUrl || post.externalLink || post.videoUrl || post.link || post.url || '';
  }
  
  const isVideo = post.type === ContentType.VIDEO;
  const isArtist = viewMode === 'LIBRARY' || post.type === ContentType.IMAGE;

  // --- 1. 리스트 레이아웃 (HOME, GAME, REF) ---
  if (viewMode === 'HOME' || viewMode === 'GAME' || viewMode === 'REF') {
    const isRef = post.type === ContentType.REF;
    const isGame = post.type === ContentType.GAME;
    const useSquareImage = isGame || isRef;

    const handleCardClick = () => {
      if (!isGame && contentUrl && contentUrl !== '#') {
        window.open(contentUrl, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <div 
        className={`group flex flex-row gap-4 p-4 border-b transition-colors min-h-[140px] ${isGame ? 'cursor-default' : 'cursor-pointer'} ${isDarkMode ? 'hover:bg-[#1C2128]' : 'hover:bg-gray-50'} ${isDarkMode ? 'border-[#30363D]' : 'border-gray-100'}`}
        onClick={handleCardClick}
      >
        <div 
          className={`flex-shrink-0 rounded-lg overflow-hidden relative ${isGame ? 'cursor-default' : 'cursor-pointer'} self-start ${
            useSquareImage ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-28 h-20 sm:w-48 sm:h-32'
          } ${isDarkMode ? 'bg-[#0D1117]' : 'bg-gray-100'}`}
          onClick={(e) => {
            if (isGame) {
              e.stopPropagation();
              return;
            }
            e.stopPropagation();
            if (isVideo && onVideoClick) onVideoClick(contentUrl);
            else if (isArtist) window.open(contentUrl, '_blank');
            else onImageClick && onImageClick(displayImage);
          }}
        >
          <img 
            src={imageError ? 'https://via.placeholder.com/400x225?text=Image+Failed' : displayImage} 
            alt={post.title}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110`} 
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 justify-start pt-0.5">
          <h3 className={`font-bold text-sm sm:text-lg leading-tight transition-colors mb-1.5 line-clamp-1 ${
            isDarkMode ? `text-gray-100 ${isGame ? '' : 'group-hover:text-blue-400'}` : `text-gray-800 ${isGame ? '' : 'group-hover:text-blue-600'}`
          }`}>
            {post.title}
          </h3>
          
          <div className="mb-3">
            <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {post.description}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mt-auto md:mt-0">
            {isGame && post.gameLinks?.map((link: any, idx: number) => (
              <Chip key={`game-link-${post.id}-${idx}`} label={link.label} url={link.url} isDarkMode={isDarkMode} />
            ))}
            {!isGame && post.category && (
              <Chip label={Array.isArray(post.category) ? post.category[0] : post.category} isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. 그리드 레이아웃 (VIDEO, LIBRARY) ---
  return (
    <div 
      className={`transition-all cursor-pointer group flex flex-col h-full border rounded-lg overflow-hidden ${
        isDarkMode 
          ? 'bg-[#161B22] border-[#30363D] hover:bg-[#1C2128]' 
          : 'bg-white border-gray-100 hover:bg-gray-50'
      }`}
      onClick={() => {
        if (isVideo && onVideoClick && contentUrl) {
          onVideoClick(contentUrl);
        } else if (isArtist) {
          window.open(contentUrl, '_blank');
        } else if (contentUrl && contentUrl !== '#') {
          window.open(contentUrl, '_blank');
        }
      }}
    >
      <div className={`relative w-full overflow-hidden ${isVideo ? 'aspect-video bg-gray-900' : 'aspect-[3/4] bg-gray-100'}`}>
        <img 
          src={imageError ? 'https://via.placeholder.com/400x225?text=Image+Failed' : displayImage} 
          alt={post.title}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isVideo ? 'opacity-90 group-hover:opacity-100' : ''}`}
        />
        
        {/* 비디오용 재생 아이콘 */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all">
                <Play size={20} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* 아티스트용 외부 링크 아이콘 */}
        {isArtist && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1.5 bg-black/50 backdrop-blur-md rounded-md border border-white/20">
              <ExternalLink size={14} className="text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1 min-w-0">
          <h3 className={`font-bold text-sm line-clamp-1 mb-1.5 transition-colors ${
            isDarkMode ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'
          }`}>
            {post.title}
          </h3>
          <p className={`text-[11px] leading-tight line-clamp-2 mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {post.description}
          </p>
          <div className="mt-auto flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {post.category && (
                <Chip label={Array.isArray(post.category) ? post.category[0] : post.category} isDarkMode={isDarkMode} />
              )}
          </div>
      </div>
    </div>
  );
};

export default PostCard;