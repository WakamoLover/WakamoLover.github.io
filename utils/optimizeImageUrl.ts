export type ImagePlatform = 'twitter' | 'youtube' | 'bilibili' | 'niconico' | 'other';

const DEFAULT_BILIBILI_WIDTH = 640;

const isDomainOrSubdomain = (hostname: string, domain: string) =>
  hostname === domain || hostname.endsWith(`.${domain}`);

export const getImagePlatform = (src: string): ImagePlatform => {
  try {
    const url = new URL(src.startsWith('//') ? `https:${src}` : src);
    const hostname = url.hostname.toLowerCase();

    if (hostname === 'pbs.twimg.com') return 'twitter';
    if (isDomainOrSubdomain(hostname, 'ytimg.com')) return 'youtube';
    if (isDomainOrSubdomain(hostname, 'hdslb.com')) return 'bilibili';
    if (
      isDomainOrSubdomain(hostname, 'nimg.jp') ||
      isDomainOrSubdomain(hostname, 'smilevideo.jp') ||
      isDomainOrSubdomain(hostname, 'nicovideo.jp') ||
      hostname === 'nico.ms'
    ) {
      return 'niconico';
    }
  } catch {
    return 'other';
  }

  return 'other';
};

export const optimizeImageUrl = (src: string, width = DEFAULT_BILIBILI_WIDTH): string => {
  try {
    const url = new URL(src.startsWith('//') ? `https:${src}` : src);
    const hostname = url.hostname.toLowerCase();

    if (hostname === 'pbs.twimg.com' && /\/media\//.test(url.pathname)) {
      const currentSize = url.searchParams.get('name')?.toLowerCase();
      const currentDimensions = currentSize?.match(/^(\d+)x(\d+)$/);
      const isAlreadySmall =
        currentSize === 'small' ||
        currentSize === 'thumb' ||
        (currentDimensions && Math.max(Number(currentDimensions[1]), Number(currentDimensions[2])) <= 600);

      if (!isAlreadySmall) {
        url.searchParams.set('name', 'medium');
        return url.toString();
      }
    }

    if (
      isDomainOrSubdomain(hostname, 'ytimg.com') &&
      /\/maxresdefault\.(?:jpg|jpeg|webp)$/i.test(url.pathname)
    ) {
      url.pathname = url.pathname.replace(/\/maxresdefault(?=\.(?:jpg|jpeg|webp)$)/i, '/hqdefault');
      return url.toString();
    }

    if (isDomainOrSubdomain(hostname, 'hdslb.com')) {
      const safeWidth = Number.isFinite(width) && width > 0 ? Math.floor(width) : DEFAULT_BILIBILI_WIDTH;
      const resized = url.pathname.match(/^(.+\.(?:jpe?g|png|gif|webp))@(\d+)w(?:_[^/]*)?$/i);

      if (resized) {
        if (Number(resized[2]) <= safeWidth) return url.toString();
        url.pathname = `${resized[1]}@${safeWidth}w.webp`;
        return url.toString();
      }

      if (/\.(?:jpe?g|png|gif|webp)$/i.test(url.pathname)) {
        url.pathname = `${url.pathname}@${safeWidth}w.webp`;
        return url.toString();
      }
    }
  } catch {
    return src;
  }

  return src;
};
