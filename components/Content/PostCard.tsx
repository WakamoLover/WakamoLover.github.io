import React, { useState } from 'react';
import { ContentType } from '../../types';
import { ExternalLink } from 'lucide-react';

interface PostCardProps {
  post: any;
  viewMode: string;
  isDarkMode: boolean;
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

const PostCard: React.FC<PostCardProps> = ({ post, viewMode, isDarkMode, onImageClick }) => {
  const [imageError, setImageError] = useState(false);
  const [iconError, setIconError] = useState(false);
  
  const displayImage = post.thumbnail || post.coverImage;
  
  // 각 타입별로 링크 우선순위 설정
  let contentUrl = '';
  if (post.type === ContentType.VIDEO) {
    contentUrl = post.externalLink || post.channelUrl || post.videoUrl || post.originalUrl || '';
  } else if (post.type === ContentType.REF || post.type === ContentType.IMAGE) {
    contentUrl = post.externalLink || post.originalUrl || '';
  } else if (post.type === ContentType.GAME) {
    contentUrl = '';
  } else {
    contentUrl = post.originalUrl || post.externalLink || post.channelUrl || post.videoUrl || post.link || post.url || '';
  }
  
  const isVideo = post.type === ContentType.VIDEO;
  const isArtist = viewMode === 'LIBRARY' || post.type === ContentType.IMAGE;
  const isSquareVideo = isVideo && !!post.thumbnail && (post.thumbnail.includes('ytimg') || post.thumbnail.includes('youtube') || post.thumbnail.includes('i.ytimg'));
  const channelLabel = isVideo && contentUrl ? (() => {
    try {
      const url = new URL(contentUrl);
      if (url.hostname.includes('youtube.com')) {
        const handle = url.pathname.startsWith('/@') ? url.pathname : url.pathname.replace(/^\//, '');
        return handle ? handle.replace(/^@/, '') : 'YouTube Channel';
      }
    } catch {
      // ignore
    }
    return '';
  })() : '';

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
        className={`group flex flex-row gap-4 p-4 rounded-2xl border transition-all min-h-[140px] ${isGame ? 'cursor-default' : 'cursor-pointer'} ${isDarkMode ? 'bg-[#07111f] border-slate-800 hover:bg-[#0d1729]' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
        onClick={handleCardClick}
      >
        <div
          className={`flex-shrink-0 rounded-2xl overflow-hidden relative ${isGame ? 'cursor-default' : 'cursor-pointer'} self-start ${
            useSquareImage ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-28 h-20 sm:w-40 sm:h-28'
          } ${isDarkMode ? 'bg-[#0D1117]' : 'bg-slate-100'}`}
          onClick={(e) => {
            if (isGame) {
              e.stopPropagation();
              return;
            }
            e.stopPropagation();
            if (contentUrl) {
              window.open(contentUrl, '_blank', 'noopener,noreferrer');
            } else {
              onImageClick && onImageClick(displayImage);
            }
          }}
        >
          <img
            src={imageError ? 'https://via.placeholder.com/400x225?text=Image+Failed' : displayImage}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform"
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 justify-start pt-0.5">
          <h3 className={`font-semibold text-sm sm:text-base leading-tight transition-colors mb-1 line-clamp-1 ${
            isDarkMode ? `text-white ${isGame ? '' : 'group-hover:text-sky-300'}` : `text-slate-900 ${isGame ? '' : 'group-hover:text-sky-600'}`
          }`}>
            {post.title}
          </h3>

          <div className="mb-3">
            <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {post.description}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 relative z-30">
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
      className={`transition-all duration-300 transform group flex flex-col h-full border rounded-2xl overflow-hidden ${
        isDarkMode
          ? 'bg-[#07111f] border-slate-800 shadow-[0_20px_50px_rgba(4,12,28,0.35)] hover:-translate-y-0.5 hover:border-sky-500/20'
          : 'bg-white border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-0.5'
      }`}
      onClick={() => {
        if (contentUrl && contentUrl !== '#') {
          window.open(contentUrl, '_blank', 'noopener,noreferrer');
        } else if (isArtist) {
          window.open(contentUrl, '_blank');
        }
      }}
    >
      <div className={`relative w-full overflow-hidden ${isVideo ? (isSquareVideo ? 'aspect-square bg-[#0a1220]' : 'aspect-video bg-[#0a1220]') : 'aspect-[3/4] bg-[#0a1220]'}`}>
        <img
          src={imageError ? 'https://via.placeholder.com/400x225?text=Image+Failed' : displayImage}
          alt={post.title}
          onError={() => setImageError(true)}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform ${isSquareVideo ? 'object-contain p-3 rounded-2xl' : 'object-cover'} ${isVideo ? 'opacity-90 group-hover:opacity-100' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_28%)]" />

        {isVideo && contentUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-full border border-sky-400/15 bg-black/35 backdrop-blur-md flex items-center justify-center shadow-[0_0_24px_rgba(56,189,248,0.18)]">
              <ExternalLink size={18} className="text-sky-200" />
            </div>
          </div>
        )}

        {isVideo && channelLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`absolute bottom-3 left-3 right-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 backdrop-blur-md ${isDarkMode ? 'border-white/10 bg-black/45 text-slate-100' : 'border-slate-200/70 bg-white/75 text-slate-700'}`}>
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
              <span className="text-[11px] font-medium truncate">{channelLabel}</span>
            </div>
            <div className={`absolute left-3 top-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border shadow-lg ${isDarkMode ? 'border-slate-900 bg-slate-950' : 'border-white bg-slate-50'}`}>
              <img
                src={iconError ? 'https://via.placeholder.com/160x160?text=Channel' : displayImage}
                alt={`${channelLabel} icon`}
                className="h-full w-full object-cover"
                onError={() => setIconError(true)}
              />
            </div>
          </div>
        )}

        {isArtist && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1.5 bg-black/45 backdrop-blur-md rounded-xl border border-white/10">
              <ExternalLink size={14} className="text-slate-100" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 min-w-0">
        <h3 className={`font-semibold text-base md:text-lg line-clamp-2 mb-1 transition-colors ${
          isDarkMode ? 'text-white group-hover:text-sky-300' : 'text-slate-900 group-hover:text-sky-600'
        }`}>
          {post.title}
        </h3>
        <p className={`text-[12px] leading-relaxed line-clamp-3 mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {post.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 relative z-30">
          {post.category && (
            <Chip label={Array.isArray(post.category) ? post.category[0] : post.category} isDarkMode={isDarkMode} />
          )}
          {isVideo && channelLabel && (
            <Chip label="Channel" isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;