import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Layout/Header';
import HeroCarousel from './components/Home/HeroSection';
import PostCard from './components/Content/PostCard';
import RightSidebar from './components/Sidebar/RightSidebar';
import VideoModal from './components/Content/VideoModal';
import ImageModal from './components/Content/ImageModal';
import { MOCK_POSTS, CATEGORY_TABS } from './constants/index';
import { ContentType } from './types';
import { LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

const getAutoThumbnail = (url: string | undefined, coverImage?: string, imageIndex: number = 1): string => {
  if (coverImage && coverImage.trim() !== '') {
    if (coverImage.startsWith('http')) return coverImage;
    return `/media/${coverImage}`;
  }
  if (!url) return 'https://placehold.co/400x225?text=No+Link';

  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;

  const xMatch = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  if (xMatch) {
    const tweetId = xMatch[1];
    const imageParam = imageIndex > 1 ? `?image=${imageIndex}` : '';
    return `https://nitter.net/i/web/status/${tweetId}${imageParam}`;
  }

  const nicoMatch = url.match(/sm(\d+)/);
  if (nicoMatch) return `https://nicovideo.cdn.nimg.jp/thumbnails/${nicoMatch[1]}/${nicoMatch[1]}`;

  if (url.includes('bilibili.com')) return 'https://archive.bilibili.com/favicon.ico';
  return 'https://placehold.co/400x225?text=Link+Preview';
};

const getEmbedUrl = (url: string): string => {
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  const nicoMatch = url.match(/sm(\d+)/);
  if (nicoMatch) return `https://embed.nicovideo.jp/watch/sm${nicoMatch[1]}?autoplay=1`;
  const biliMatch = url.match(/(BV[a-zA-Z0-9]+)/);
  if (biliMatch) return `https://player.bilibili.com/player.html?bvid=${biliMatch[1]}&autoplay=1`;
  return url;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('HOME');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Detect browser's dark mode preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isMuted, setIsMuted] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const playerRef = useRef<any>(null);
  const pageSizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player('bgm-player', {
            height: '0', width: '0', videoId: '7AtD9EjJXKo',
            playerVars: { autoplay: 0, loop: 1, playlist: '7AtD9EjJXKo', controls: 0, disablekb: 1 },
            events: { onReady: (event: any) => event.target.setVolume(25) }
          });
        }
      };
    }
  }, []);

  useEffect(() => {
    if (playerRef.current?.playVideo) {
      if (!isMuted) playerRef.current.playVideo();
      else playerRef.current.pauseVideo();
    }
  }, [isMuted]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setCurrentCategory('All'); 
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const allFilteredPosts = useMemo(() => {
    let result = (MOCK_POSTS || []).map((post: any) => {
      // 각 타입별로 URL을 올바르게 선택
      let url = '';
      if (post.type === ContentType.VIDEO) {
        url = post.videoUrl || '';
      } else if (post.type === ContentType.IMAGE) {
        url = post.externalLink || '';
      } else if (post.type === ContentType.REF) {
        url = post.externalLink || '';
      } else if (post.type === ContentType.GAME) {
        url = '';
      } else {
        url = post.externalLink || post.videoUrl || post.link || post.url || '';
      }

      return {
        ...post,
        originalUrl: url,
        thumbnail: getAutoThumbnail(url, post.coverImage, post.imageIndex || 1),
      };
    });

    // 1. 페이지 뷰에 따른 필터링
    if (currentView !== 'HOME') {
      const typeMap: Record<string, ContentType> = {
        GAME: ContentType.GAME, REF: ContentType.REF, VIDEO: ContentType.VIDEO, WORK: ContentType.IMAGE,
      };
      if (typeMap[currentView]) {
        result = result.filter(p => p.type === typeMap[currentView]);
      }
    }

    // 2. 카테고리 필터링
    if (currentCategory !== 'All') {
      result = result.filter(p => {
        if (Array.isArray(p.category)) {
          return p.category.includes(currentCategory);
        } else {
          return p.category === currentCategory;
        }
      });
    }

    // 3. 검색어 필터링
    if (searchTerm.trim() !== '') {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }

    return result;
  }, [currentView, currentCategory, searchTerm]);

  const totalPages = Math.ceil(allFilteredPosts.length / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return allFilteredPosts.slice(start, start + pageSize);
  }, [allFilteredPosts, currentPage, pageSize]);

  const tabs = CATEGORY_TABS[currentView as keyof typeof CATEGORY_TABS];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0D1117] text-gray-200' : 'bg-[#F0F2F5] text-gray-900'}`}>
      <div id="bgm-player" className="hidden"></div>
      <Header currentView={currentView} onNavigate={handleNavigate} searchTerm={searchTerm} onSearchChange={setSearchTerm} isDarkMode={isDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 lg:col-span-9">
            {currentView === 'HOME' && !searchTerm && <HeroCarousel />}
            
            <div className={`rounded-xl border min-h-[500px] flex flex-col relative ${isDarkMode ? 'bg-[#161B22] border-[#30363D]' : 'bg-white border-gray-200 shadow-sm'}`}>
                {/* 상단 탭 및 개수 설정 */}
                <div className={`border-b z-10 px-4 py-3 md:sticky md:top-16 flex items-center justify-between rounded-t-xl ${isDarkMode ? 'bg-[#161B22]/95 backdrop-blur-md border-[#30363D]' : 'bg-white border-gray-200'}`}>
                   {tabs && !searchTerm ? (
                      <div className="flex items-center gap-2 overflow-x-auto max-w-[75%] py-3 px-1 scrollbar-hide">
                        {tabs.map(tab => (
                          <button key={tab} onClick={() => handleCategorySelect(tab)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${currentCategory === tab ? 'bg-blue-600 text-white border-blue-600' : isDarkMode ? 'bg-[#21262D] text-gray-400 border-[#30363D]' : 'bg-gray-100 text-gray-500 border-transparent'}`}>
                            {tab}
                          </button>
                        ))}
                      </div>
                   ) : (searchTerm ? <h2 className="text-sm font-bold ml-2">"{searchTerm}" results</h2> : <div />)}

                   <div className="relative" ref={pageSizeRef}>
                      <button onClick={() => setIsPageSizeOpen(!isPageSizeOpen)} className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg transition-colors ${isDarkMode ? 'bg-[#21262D] border-[#30363D] hover:bg-[#2d333b]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <LayoutGrid size={14} /><span className="text-xs font-bold">{pageSize}</span>
                      </button>
                      {isPageSizeOpen && (
                        <div className={`absolute right-0 top-full mt-2 w-32 border rounded-xl overflow-hidden z-[100] shadow-xl ${isDarkMode ? 'bg-[#161B22] border-[#30363D]' : 'bg-white border-gray-200'}`}>
                          {[12, 24, 36, 48].map((size) => (
                            <button key={size} className={`w-full px-4 py-2.5 text-xs text-left hover:bg-blue-500 hover:text-white transition-colors ${pageSize === size ? 'text-blue-500 font-bold' : ''}`} onClick={() => { setPageSize(size); setIsPageSizeOpen(false); setCurrentPage(1); }}>Show {size}</button>
                          ))}
                        </div>
                      )}
                   </div>
                </div>

                {/* 메인 콘텐츠 그리드 */}
                <div className={`flex-1 ${(currentView === 'VIDEO' || currentView === 'WORK') ? 'p-4' : 'p-0'}`}>
                    {paginatedPosts.length > 0 ? (
                      <div className={`grid ${currentView === 'VIDEO' ? 'grid-cols-1 sm:grid-cols-2 gap-4' : currentView === 'WORK' ? 'grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-0'}`}>
                          {paginatedPosts.map((post: any) => (
                            <PostCard 
                              key={post.id} 
                              post={post} 
                              viewMode={currentView} 
                              isDarkMode={isDarkMode} 
                              onVideoClick={(url: string) => {
                                setCurrentVideoUrl(getEmbedUrl(url)); 
                                setIsModalOpen(true);
                              }} 
                              onImageClick={(imgUrl: string) => {
                                if (post.type === ContentType.IMAGE && post.originalUrl.includes('x.com')) {
                                  window.open(post.originalUrl, '_blank');
                                } else {
                                  setCurrentImageUrl(imgUrl); 
                                  setIsImageModalOpen(true);
                                }
                              }} 
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="py-32 text-center text-gray-500">No content found.</div>
                    )}
                </div>

                {/* --- 페이지네이션 섹션 --- */}
                {totalPages > 1 && (
                  <div className={`py-8 flex justify-center items-center gap-3 border-t mt-auto ${isDarkMode ? 'border-[#30363D]' : 'border-gray-100'}`}>
                    <button 
                      disabled={currentPage === 1} 
                      onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className={`p-2 rounded-xl border transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : isDarkMode ? 'hover:bg-[#21262D] border-[#30363D]' : 'hover:bg-gray-100 border-gray-200'}`}
                    >
                      <ChevronLeft size={18}/>
                    </button>
                    
                    <div className="flex gap-2 items-center">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = currentPage === pageNum;
                        return (
                          <button 
                            key={pageNum} 
                            onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all border flex items-center justify-center ${
                              isActive 
                                ? 'bg-blue-600 border-blue-600 text-white' 
                                : isDarkMode 
                                  ? 'bg-[#161B22] border-[#30363D] text-gray-400 hover:border-gray-500' 
                                  : 'bg-white border-gray-200 text-gray-500 hover:border-blue-400'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button 
                      disabled={currentPage === totalPages} 
                      onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className={`p-2 rounded-xl border transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : isDarkMode ? 'hover:bg-[#21262D] border-[#30363D]' : 'hover:bg-gray-100 border-gray-200'}`}
                    >
                      <ChevronRight size={18}/>
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3">
            <RightSidebar 
              onNavigate={handleNavigate} 
              onCategorySelect={handleCategorySelect} 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              isMuted={isMuted} 
              setIsMuted={setIsMuted} 
            />
          </div>
        </div>
      </main>

      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} videoUrl={currentVideoUrl} />
      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />
    </div>
  );
};

export default App;