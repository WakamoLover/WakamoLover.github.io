import React, { useState, useMemo } from 'react';
import Header from './components/Layout';
import PostCard from './components/Content/PostCard';
import RightSidebar from './components/Sidebar/RightSidebar';
import ImageModal from './components/Content/ImageModal';
import HomeLandingSection from './components/Home/HomeLandingSection';
import { MOCK_POSTS, CATEGORY_TABS } from './constants/index';
import { ContentType } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getCoverImage = (coverImage?: string): string => {
  if (coverImage && coverImage.trim() !== '') {
    if (coverImage.startsWith('http')) return coverImage;
    return `/media/${coverImage}`;
  }
  return 'https://placehold.co/400x225?text=No+Cover+Image';
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('HOME');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setCurrentCategory('All'); 
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

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

      const thumbnail = getCoverImage(post.coverImage);

      return {
        ...post,
        originalUrl: url,
        thumbnail,
      };
    });

    if (currentView !== 'HOME') {
      const typeMap: Record<string, ContentType> = {
        GAME: ContentType.GAME, REF: ContentType.REF, VIDEO: ContentType.VIDEO, LIBRARY: ContentType.IMAGE,
      };
      if (typeMap[currentView]) {
        result = result.filter(p => p.type === typeMap[currentView]);
      }
    }

    if (currentCategory !== 'All') {
      result = result.filter(p => {
        if (Array.isArray(p.category)) {
          return p.category.includes(currentCategory);
        } else {
          return p.category === currentCategory;
        }
      });
    }

    if (searchTerm.trim() !== '') {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) || 
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }

    return [...result].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  }, [currentView, currentCategory, searchTerm]);

  const displayPosts = allFilteredPosts;

  const effectivePageSize = currentView === 'VIDEO' ? 25 : currentView === 'LIBRARY' ? 12 : pageSize;
  const totalPages = Math.ceil(displayPosts.length / effectivePageSize);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * effectivePageSize;
    return displayPosts.slice(start, start + effectivePageSize);
  }, [displayPosts, currentPage, effectivePageSize]);

  const tabs = getCategories();

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {currentView === 'HOME' && !searchTerm ? (
          <HomeLandingSection 
            onNavigate={handleNavigate}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 lg:col-span-9">
              <div className="rounded-xl border min-h-[500px] flex flex-col relative bg-white border-gray-200 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start">
                  {tabs.length > 0 && !searchTerm && (
                    <aside className="hidden rounded-xl lg:flex lg:flex-col lg:gap-2 lg:w-48 xl:w-52 pt-4 pb-4 px-4 bg-white border-r border-gray-200">
                      <span className="text-xs uppercase tracking-[0.24em] mt-0 text-slate-500">Category</span>
                      {tabs.map(tab => (
                        <button 
                          key={tab} 
                          onClick={() => handleCategorySelect(tab)} 
                          className={`w-full text-left px-4 py-3 rounded-full transition-colors ${currentCategory === tab ? 'bg-gray-100 text-black font-bold' : 'text-black hover:bg-gray-100'}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </aside>
                  )}

                  <div className="flex-1 p-4">
                    {paginatedPosts.length > 0 ? (
                      <div className={`grid ${currentView === 'VIDEO' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3' : currentView === 'LIBRARY' ? 'grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1 gap-3'}`}>
                        {paginatedPosts.map((post: any) => (
                          <PostCard 
                            key={post.id} 
                            post={post} 
                            viewMode={currentView} 
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
                      <div className="py-8 flex justify-center items-center gap-3 border-t border-gray-100 mt-auto">
                        <button 
                          disabled={currentPage === 1} 
                          onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                          className={`p-2 rounded-xl border transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-100 border-gray-200'}`}
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
                          className={`p-2 rounded-xl border transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-100 border-gray-200'}`}
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
              />
            </div>
          </div>
        )}
      </main>

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />
    </div>
  );
};

export default App;