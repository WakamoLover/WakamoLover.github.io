import React, { useState } from 'react';
import { ContentType } from '../../types';
import { ExternalLink, Play } from 'lucide-react';

interface PostCardProps {
  post: any;
  viewMode: string;
  onImageClick?: (url: string) => void;
}

const Chip: React.FC<{ label: string; url?: string }> = ({ label, url }) => {
  const commonClasses = "text-[11px] px-2.5 py-0.5 rounded-full transition-all inline-flex items-center whitespace-nowrap flex-shrink-0 border font-medium";

  if (url) {
    return (
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${commonClasses} bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
  }
  return (
    <span className={`${commonClasses} bg-slate-100 text-slate-600 border-slate-200`}>
      {label}
    </span>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, viewMode, onImageClick }) => {
  const [imageError, setImageError] = useState(false);
  
  const displayImage = post.thumbnail || post.coverImage;
  
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
        className="group flex flex-row gap-4 p-4 rounded-2xl border transition-all min-h-[140px] cursor-pointer bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50"
        onClick={handleCardClick}
      >
        <div
          className={`flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer self-start ${
            useSquareImage ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-28 h-20 sm:w-40 sm:h-28'
          } bg-slate-100`}
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
            src={imageError ? 'https://placehold.co/400x225?text=Image+Failed' : displayImage}
            alt={post.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform"
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0 justify-start pt-0.5">
          <h3 className="font-semibold text-sm sm:text-base leading-tight transition-colors mb-1 line-clamp-1 text-slate-900 group-hover:text-sky-600">
            {post.title}
          </h3>

          <div className="mb-3">
            <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 text-slate-600">
              {post.description}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 relative z-30">
            {isGame && post.gameLinks?.map((link: any, idx: number) => (
              <Chip key={`game-link-${post.id}-${idx}`} label={link.label} url={link.url} />
            ))}
            {!isGame && post.category && (
              <Chip label={Array.isArray(post.category) ? post.category[0] : post.category} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="transition-all duration-300 transform group flex flex-col h-full border rounded-2xl overflow-hidden bg-white border-slate-200 hover:border-slate-400 cursor-pointer"
      onClick={() => {
        if (contentUrl && contentUrl !== '#') {
          window.open(contentUrl, '_blank', 'noopener,noreferrer');
        } else if (isArtist) {
          window.open(contentUrl, '_blank');
        }
      }}
    >
      <div className={`relative w-full overflow-hidden bg-slate-100 ${
        isVideo ? 'aspect-video' : 'aspect-[3/4]'
      }`}>
        <img
          src={imageError ? 'https://placehold.co/400x225?text=Image+Failed' : displayImage}
          alt={post.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform"
        />

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-sky-500 group-hover:scale-110 transition-all">
              <Play size={20} className="fill-white ml-0.5 text-white" />
            </div>
          </div>
        )}

        {isArtist && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1.5 bg-slate-900/70 backdrop-blur-md rounded-xl text-white">
              <ExternalLink size={14} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <h3 className="font-bold text-base line-clamp-2 mb-1.5 transition-colors text-slate-900 group-hover:text-sky-600">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-xs leading-relaxed line-clamp-2 mb-3 text-slate-500">
              {post.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-2 relative z-30">
          {post.category && (
            <Chip label={Array.isArray(post.category) ? post.category[0] : post.category} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;