import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Layout';
import HeroCarousel from './components/Home/HeroSection';
import PostCard from './components/Content/PostCard';
import RightSidebar from './components/Sidebar/RightSidebar';
import ImageModal from './components/Content/ImageModal';
import { MOCK_POSTS, CATEGORY_TABS } from './constants/index';
import { ContentType } from './types';
import { LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';

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

const isYouTubeChannelUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:@[^/]+|channel\/[^/]+)/i.test(url);
};

const resolveYouTubeChannelThumbnail = async (url: string | undefined, coverImage?: string, imageIndex: number = 1): Promise<string> => {
  if (coverImage && coverImage.trim() !== '') {
    if (coverImage.startsWith('http')) return coverImage;
    return `/media/${coverImage}`;
  }

  if (!url || !isYouTubeChannelUrl(url)) {
    return getAutoThumbnail(url, coverImage, imageIndex);
  }

  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (response.ok) {
      const data = await response.json();
      if (data?.thumbnail_url) return data.thumbnail_url;
    }
  } catch {
    // fallback to placeholder below
  }

  return `https://yt3.ggpht.com/ytc/AKedOLR2p3QJ1qQw4M6x0b5a7t7c6b4T4VQwQhjS-vQ=s900-c-k-c0x00ffffff-no-rj`;
};


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('HOME');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [resolvedThumbnails, setResolvedThumbnails] = useState<Record<string, string>>({});

  

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setCurrentCategory('All'); 
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  // Get categories for current view
  const getCategories = (): string[] => {
    if (currentView === 'HOME') return [];
    const viewKey = currentView as keyof typeof CATEGORY_TABS;
    const categories = CATEGORY_TABS[viewKey] || [];

    const withoutAll = categories.filter(category => category !== 'All');
    const others = withoutAll.filter(category => category === 'Others');
    const rest = withoutAll.filter(category => category !== 'Others').sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    return ['All', ...rest, ...others];
  };

  const allFilteredPosts = useMemo(() => {
    let result = (MOCK_POSTS || []).map((post: any) => {
      let url = '';
      if (post.type === ContentType.VIDEO) {
        url = post.externalLink || post.channelUrl || post.videoUrl || '';
      } else if (post.type === ContentType.GAME) {
        url = '';
      } else {
        url = post.externalLink || post.channelUrl || post.videoUrl || post.link || post.url || '';
      }

      return {
        ...post,
        originalUrl: url,
        thumbnail: getAutoThumbnail(url, post.coverImage, post.imageIndex || 1),
      };
    });

    // 1. Page View Filtering
    if (currentView !== 'HOME') {
      const typeMap: Record<string, ContentType> = {
        GAME: ContentType.GAME, REF: ContentType.REF, VIDEO: ContentType.VIDEO, LIBRARY: ContentType.IMAGE,
      };
      if (typeMap[currentView]) {
        result = result.filter(p => p.type === typeMap[currentView]);
      }
    }

    // 2. Cateory Filtering
    if (currentCategory !== 'All') {
      result = result.filter(p => {
        if (Array.isArray(p.category)) {
          return p.category.includes(currentCategory);
        } else {
          return p.category === currentCategory;
        }
      });
    }

    // 3. Search Filtering
    if (searchTerm.trim() !== '') {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }

    return [...result].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  }, [currentView, currentCategory, searchTerm]);

  useEffect(() => {
    let isMounted = true;
    const pending = allFilteredPosts.filter(post => {
      const url = post.originalUrl || post.channelUrl || post.videoUrl || post.externalLink || '';
      return post.type === ContentType.VIDEO && isYouTubeChannelUrl(url) && !resolvedThumbnails[post.id];
    });

    if (pending.length === 0) return undefined;

    Promise.all(
      pending.map(async (post) => {
        const url = post.originalUrl || post.channelUrl || post.videoUrl || post.externalLink || '';
        const thumbnail = await resolveYouTubeChannelThumbnail(url, post.coverImage, post.imageIndex || 1);
        return [post.id, thumbnail] as const;
      })
    ).then((results) => {
      if (!isMounted) return;
      setResolvedThumbnails(prev => ({ ...prev, ...Object.fromEntries(results) }));
    }).catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [allFilteredPosts, resolvedThumbnails]);

  const displayPosts = useMemo(() => {
    return allFilteredPosts.map(post => ({
      ...post,
      thumbnail: resolvedThumbnails[post.id] || post.thumbnail,
    }));
  }, [allFilteredPosts, resolvedThumbnails]);

  const effectivePageSize = currentView === 'LIBRARY' ? 9 : pageSize;
  const totalPages = Math.ceil(displayPosts.length / effectivePageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * effectivePageSize;
    return displayPosts.slice(start, start + effectivePageSize);
  }, [displayPosts, currentPage, effectivePageSize]);

  const tabs = getCategories();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_18%),#020617] text-slate-100' : 'bg-[#F0F2F5] text-slate-900'}`}>
      <Header currentView={currentView} onNavigate={handleNavigate} isDarkMode={isDarkMode} />

      {currentView === 'HOME' && !searchTerm && (
        <div className="w-full overflow-hidden">
          <HeroCarousel />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 lg:col-span-9">
            <div className={`rounded-xl border min-h-[500px] flex flex-col relative ${isDarkMode ? 'bg-[#161B22] border-[#30363D]' : 'bg-white border-gray-200 shadow-sm'}`}>

              {/* Top tabs and controls */}
              <div className={`border-b z-10 px-4 py-3 md:sticky md:top-16 flex items-center justify-between rounded-t-xl ${isDarkMode ? 'bg-[#161B22]/95 backdrop-blur-md border-[#30363D]' : 'bg-white border-gray-200'}`}>
                {tabs.length > 0 && !searchTerm ? (
                  <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 lg:hidden">
                    {tabs.map(tab => (
                      <button key={tab} onClick={() => handleCategorySelect(tab)} className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${currentCategory === tab ? 'bg-blue-600 text-white border-blue-600' : isDarkMode ? 'bg-[#21262D] text-gray-400 border-[#30363D]' : 'bg-gray-100 text-gray-500 border-transparent'}`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                ) : (searchTerm ? <h2 className="text-sm font-bold ml-2">"{searchTerm}" results</h2> : <div />)}

                   <div />
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start">
                {tabs.length > 0 && !searchTerm && (
                  <aside className={`hidden lg:flex lg:flex-col lg:gap-2 lg:w-48 xl:w-52 pt-4 pb-4 px-4 ${isDarkMode ? 'bg-[#121820] border-r border-[#30363D]' : 'bg-white border-r border-gray-200'}`}>
                    <span className={`text-xs uppercase tracking-[0.24em] mt-0 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Category</span>
                    {tabs.map(tab => (
                      <button key={tab} onClick={() => handleCategorySelect(tab)} className={`w-full text-left px-4 py-3 rounded-full transition-colors ${currentCategory === tab ? 'bg-sky-500/15 text-black font-bold' : isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-black hover:bg-slate-100'}`}>
                        {tab}
                      </button>
                    ))}
                  </aside>
                )}

                <div className="flex-1 p-4">
                  {paginatedPosts.length > 0 ? (
                    <div className={`grid ${currentView === 'VIDEO' ? 'grid-cols-1 sm:grid-cols-2 gap-4' : currentView === 'LIBRARY' ? 'grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-3'}`}>
                      {paginatedPosts.map((post: any) => (
                        <PostCard 
                          key={post.id} 
                          post={post} 
                          viewMode={currentView} 
                          isDarkMode={isDarkMode} 
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
            </div>
          </div>

          <div className="hidden md:block md:col-span-4 lg:col-span-3">
            <RightSidebar 
              onNavigate={handleNavigate} 
              onCategorySelect={handleCategorySelect} 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
            />
          </div>
        </div>
      </main>

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />
    </div>
  );
};

export default App;