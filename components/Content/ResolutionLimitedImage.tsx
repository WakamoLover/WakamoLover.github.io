import React, { useEffect, useRef, useState } from 'react';
import { optimizeImageUrl } from '../../utils/optimizeImageUrl';

const MAX_IMAGE_EDGE = 1280;

type ResolutionLimitedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

const ResolutionLimitedImage: React.FC<ResolutionLimitedImageProps> = ({
  src,
  onLoad,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const cdnOptimizedSrc = optimizeImageUrl(src);

  useEffect(() => {
    setOptimizedSrc(null);
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };
  }, [src]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (!optimizedSrc && Math.max(image.naturalWidth, image.naturalHeight) > MAX_IMAGE_EDGE) {
      const scale = MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);

      try {
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (!blob) return;
            const nextUrl = URL.createObjectURL(blob);
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = nextUrl;
            setOptimizedSrc(nextUrl);
          }, 'image/webp', 0.82);
        }
      } catch {
        // Cross-origin images without CORS support stay at their original source.
      }
    }
    onLoad?.(event);
  };

  return <img {...props} src={optimizedSrc || cdnOptimizedSrc} loading={loading} decoding={decoding} onLoad={handleLoad} />;
};

export default ResolutionLimitedImage;