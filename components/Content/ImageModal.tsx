import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  // 이미지 다운로드 핸들러
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 외부 CDN(vxtwitter 등) 이미지는 CORS 정책에 따라 직접 다운로드가 제한될 수 있음
    // 이 경우 새 탭에서 열기가 더 안정적일 수 있습니다.
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `archive-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200" 
      onClick={onClose}
    >
      {/* 상단 컨트롤 바 */}
      <div className="absolute top-4 right-4 z-[110] flex gap-2 md:gap-3">
        <button 
          onClick={handleDownload}
          title="이미지 저장"
          className="p-2.5 bg-white/10 hover:bg-blue-600 text-white rounded-full transition-all border border-white/10"
        >
          <Download size={22} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); window.open(imageUrl, '_blank'); }}
          title="원본 보기"
          className="p-2.5 bg-white/10 hover:bg-blue-600 text-white rounded-full transition-all border border-white/10"
        >
          <ExternalLink size={22} />
        </button>
        <button 
          onClick={onClose}
          title="닫기"
          className="p-2.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all border border-white/10"
        >
          <X size={22} />
        </button>
      </div>
      
      <div 
        className="relative max-w-full max-h-full flex flex-col items-center justify-center" 
        onClick={(e) => e.stopPropagation()}
      >
         <img 
            src={imageUrl} 
            alt="Full Size" 
            className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.7)] select-none animate-in zoom-in-95 duration-300"
            onContextMenu={(e) => e.preventDefault()} 
         />
         
         <div className="text-center mt-6">
           <p className="text-white/60 text-[13px] font-medium tracking-tight">
             {/* 플랫폼별 안내 메시지 분기 처리 가능 */}
             {imageUrl.includes('vxtwitter') ? "X(Twitter) Preview Image" : "Image View"}
           </p>
           <p className="text-white/30 text-[11px] mt-1 font-light">
             외부 영역을 클릭하면 닫힙니다.
           </p>
         </div>
      </div>
    </div>
  );
};

export default ImageModal;