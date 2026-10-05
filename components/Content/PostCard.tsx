import React, { useEffect, useState } from 'react';
import { ContentType } from '../../types';
import { ExternalLink, Play, Youtube } from 'lucide-react';
import CardScrollArea from './CardScrollArea';
import ResolutionLimitedImage from './ResolutionLimitedImage';
import { optimizeImageUrl } from '../../utils/optimizeImageUrl';

interface PostCardProps {
  post: any;
  viewMode: string;
  onImageClick?: (url: string) => void;
}

const LABEL_CLASSES = "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors";

const Chip: React.FC<{ label: string; url?: string }> = ({ label, url }) => {
  if (url) {
    return (
      <a 
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${LABEL_CLASSES} bg-slate-100 hover:bg-[var(--brand-accent-tint)] hover:text-[var(--brand-accent)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    );
  }
  return (
    <span className={`${LABEL_CLASSES} bg-slate-100 hover:bg-slate-200 hover:text-slate-600`}>
      {label}
    </span>
  );
};

const PlatformIcon: React.FC<{ category?: string | string[]; iconImage?: string }> = ({ category, iconImage }) => {
  const [iconError, setIconError] = React.useState(false);

  if (iconImage && !iconError) {
    const src = iconImage.startsWith('http') ? iconImage : `/media/${iconImage}`;
    return (
      <img
        src={optimizeImageUrl(src)}
        alt=""
        className="h-4 w-4 object-contain"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setIconError(true)}
      />
    );
  }

  const label = Array.isArray(category) ? category[0] : category;
  const normalized = label?.toLowerCase() || '';

  if (normalized.includes('youtube')) {
    return <Youtube size={15} strokeWidth={2.5} aria-label="YouTube" />;
  }

  if (normalized.includes('bilibili')) {
    return <span className="text-xs font-black leading-none" aria-label="Bilibili">B</span>;
  }
  if (normalized.includes('pixiv')) {
    return <span className="text-xs font-black leading-none" aria-label="Pixiv">P</span>;
  }
  if (normalized.includes('twitter') || normalized === 'x') {
    return <span className="text-xs font-black leading-none" aria-label="X">X</span>;
  }

  return null;
};

const PostCard: React.FC<PostCardProps> = ({ post, viewMode, onImageClick }) => {
  const [imageError, setImageError] = useState(false);
  const [usingIndexedFallback, setUsingIndexedFallback] = useState(false);

  const rawImage = 
    post.thumbnail || 
    post.coverImage || 
    (post as any).coverimage || 
    (post as any).cover_image;

  const formatImagePath = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/media/')) return path;
    if (path.startsWith('media/')) return `/${path}`;
    return `/media/${path.replace(/^\//, '')}`;
  };

const displayImage = optimizeImageUrl(formatImagePath(rawImage));
  useEffect(() => {
    setImageError(false);
    setUsingIndexedFallback(false);
  }, [post.id, rawImage]);

  const getIndexedFallback = (sourceKey?: string): string | undefined => {
    const match = sourceKey?.match(/^(game|ref):(\d+)$/);
    if (!match) return undefined;

    const [, type, rawIndex] = match;
    const sourceIndex = Number(rawIndex);
    if (!Number.isInteger(sourceIndex) || sourceIndex < 0) return undefined;

    if (type === 'game') {
      return `/media/game/game_${100001 + sourceIndex}.webp`;
    }

    const referenceImageIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 20, 21, 22, 23, 26, 27, 30, 31, 32, 34, 35, 37];
    const assetIndex = referenceImageIndexes.indexOf(sourceIndex);
    return assetIndex === -1 ? undefined : `/media/ref/ref_${100001 + assetIndex}.webp`;
  };

  const indexedFallback = getIndexedFallback(post.sourceKey);
  const imageSource = imageError
    ? 'https://placehold.co/400x225?text=Image+Failed'
    : usingIndexedFallback && indexedFallback
      ? indexedFallback
      : displayImage;
  const handleImageError = () => {
    if (!usingIndexedFallback && indexedFallback && indexedFallback !== displayImage) {
      setUsingIndexedFallback(true);
    } else {
      setImageError(true);
    }
  };
  
  let contentUrl = '';
  if (post.type === ContentType.MEDIA) {
    contentUrl = post.externalLink || post.channelUrl || post.videoUrl || post.originalUrl || '';
  } else if (post.type === ContentType.REF || post.type === ContentType.CREATOR) {
    contentUrl = post.externalLink || post.originalUrl || '';
  } else if (post.type === ContentType.GAME) {
    contentUrl = '';
  } else {
    contentUrl = post.originalUrl || post.externalLink || post.channelUrl || post.videoUrl || post.link || post.url || '';
  }
  
  const isVideo = post.type === ContentType.MEDIA;
  const isArtist = viewMode === 'CREATOR' || post.type === ContentType.CREATOR;
  const isMediaOrReference = viewMode === 'MEDIA' || viewMode === 'REF';
  const isVisualGrid = viewMode === 'CREATOR';
  const hasDescription = typeof post.description === 'string' && post.description.trim().length > 0;
  const categoryLabel = Array.isArray(post.category) ? post.category[0] : post.category;
  const hasPlatformIcon = Boolean(
    post.iconImage || /youtube|bilibili|pixiv|twitter/i.test(categoryLabel || '') || categoryLabel?.toLowerCase() === 'x'
  );

  if (viewMode === 'GAME') {
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
        className={`group flex h-[140px] flex-row gap-4 overflow-hidden rounded-2xl border bg-white p-4 transition-all sm:h-36 ${
          isGame ? '' : 'cursor-pointer hover:border-slate-400 hover:bg-slate-50'
        }`}
        onClick={isGame ? undefined : handleCardClick}
      >
        <div
          className={`flex-shrink-0 rounded-2xl overflow-hidden relative self-start ${
            isGame ? '' : 'cursor-pointer'
          } ${
            useSquareImage ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-28 h-20 sm:w-40 sm:h-28'
          } bg-slate-100`}
          onClick={isGame ? undefined : (e) => {
            e.stopPropagation();
            if (contentUrl) {
              window.open(contentUrl, '_blank', 'noopener,noreferrer');
            } else {
              onImageClick && onImageClick(imageSource);
            }
          }}
        >
          <ResolutionLimitedImage
            src={imageSource}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 transform-gpu will-change-transform group-hover:scale-105"
          />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-start pt-0.5">
          <h3 className={`flex min-w-0 items-baseline gap-1.5 font-semibold text-sm sm:text-base leading-tight transition-colors mb-1 text-slate-900 ${
            isGame ? '' : 'group-hover:text-[var(--brand-accent)]'
          }`}>
            <span className="truncate">{post.title}</span>
            {post.subtitle && <span className="card-subtitle shrink-0">{post.subtitle}</span>}
          </h3>

          {hasDescription && (
            <CardScrollArea className="mb-2 max-h-9 shrink-0">
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {post.description}
              </p>
            </CardScrollArea>
          )}

          {isGame && post.gameLinks?.length > 0 && (
            <CardScrollArea className={`relative z-30 ${hasDescription ? 'mt-1 max-h-9 shrink-0' : 'mt-1 min-h-0 flex-1'}`}>
              <div className="flex flex-wrap gap-2">
                {post.gameLinks.map((link: any, idx: number) => (
                  <Chip key={`game-link-${post.id}-${idx}`} label={link.label} url={link.url} />
                ))}
              </div>
            </CardScrollArea>
          )}
        </div>
      </div>
    );
  }

  if (isMediaOrReference) {
    const shortcutUrl = contentUrl || post.externalLink || post.channelUrl || '';
    const shortcutLabel = 'Open';
    const categoryLabels = Array.isArray(post.category)
      ? post.category
      : post.category
        ? [post.category]
        : [];

    return (
      <article className="group flex min-h-44 gap-3 rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 sm:gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white sm:h-[72px] sm:w-[72px]">
          <ResolutionLimitedImage
            src={imageSource}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-300 transform-gpu group-hover:scale-110"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
            <h3 className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 leading-tight">
              <span className="text-sm font-semibold text-slate-900 sm:text-base">{post.title}</span>
              {post.subtitle && <span className="card-subtitle">{post.subtitle}</span>}
            </h3>
            {categoryLabels.map((category: string) => (
              <span key={category} className={`${LABEL_CLASSES} bg-slate-100`}>
                {category}
              </span>
            ))}
          </div>
          {post.description && (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {post.description}
            </p>
          )}
          {shortcutUrl && (
            <div className="mt-auto flex justify-end">
              <Chip label={shortcutLabel} url={shortcutUrl} />
            </div>
          )}
        </div>
      </article>
    );
  }

  if (isVisualGrid) {
    return (
      <div
        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
        onClick={() => {
          if (contentUrl && contentUrl !== '#') {
            window.open(contentUrl, '_blank', 'noopener,noreferrer');
          }
        }}
      >
        <ResolutionLimitedImage
          src={imageSource}
          alt={post.title}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {hasPlatformIcon && (
          <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm">
            <PlatformIcon category={post.category} iconImage={post.iconImage} />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          {viewMode === 'CREATOR' ? (
            <>
              {post.description && (
                <p className="mb-1 text-[11px] leading-snug text-white/75 line-clamp-1">
                  {post.description}
                </p>
              )}
              <div className="flex items-end justify-between gap-2">
                <h3 className="flex min-w-0 items-baseline gap-1.5 font-semibold text-sm leading-tight drop-shadow-sm">
                  <span className="line-clamp-2">{post.title || 'Untitled'}</span>
                  {post.subtitle && <span className="card-subtitle card-subtitle-on-image shrink-0">{post.subtitle}</span>}
                </h3>
              </div>
            </>
          ) : (
            <>
              <h3 className="flex min-w-0 items-baseline gap-1.5 font-semibold text-sm leading-tight drop-shadow-sm">
                <span className="line-clamp-2">{post.title || 'Untitled'}</span>
                {post.subtitle && <span className="card-subtitle card-subtitle-on-image shrink-0">{post.subtitle}</span>}
              </h3>
            </>
          )}
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
      <div className="relative w-full overflow-hidden bg-slate-100 aspect-[3/4]">
        <ResolutionLimitedImage
          src={imageSource}
          alt={post.title}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu will-change-transform"
        />

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[var(--brand-accent)] group-hover:scale-110 transition-all">
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
          <h3 className="mb-1.5 flex min-w-0 items-baseline gap-1.5 font-bold text-base transition-colors text-slate-900 group-hover:text-[var(--brand-accent)]">
            <span className="line-clamp-2">{post.title}</span>
            {post.subtitle && <span className="card-subtitle shrink-0">{post.subtitle}</span>}
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