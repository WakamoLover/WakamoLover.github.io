import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Layout';
import PostCard from './components/Content/PostCard';
import ImageModal from './components/Content/ImageModal';
import { MOCK_POSTS, CATEGORY_TABS } from './constants/index';
import { ContentType } from './types';

const VIEW_PATHS: Record<string, string> = {
  LIBRARY: '/creator',
  VIDEO: '/media',
  GAME: '/game',
  REF: '/reference',
};

const getViewFromPath = () => {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return Object.entries(VIEW_PATHS).find(([, path]) => path === pathname)?.[0] || 'LIBRARY';
};

const getCoverImage = (coverImage?: string): string => {
  if (coverImage && coverImage.trim() !== '') {
    if (coverImage.startsWith('http')) return coverImage;
    return `/media/${coverImage}`;
  }
  return 'https://placehold.co/400x225?text=No+Cover+Image';
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState(getViewFromPath);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const handleNavigate = (view: string) => {
    const nextView = VIEW_PATHS[view] ? view : 'LIBRARY';
    const nextPath = VIEW_PATHS[nextView];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view: nextView }, '', nextPath);
    }
    setCurrentView(nextView);
    setCurrentCategory('All'); 
    setVisibleCount(24);
  };

  useEffect(() => {
    const syncViewFromPath = () => {
      const view = getViewFromPath();
      const path = VIEW_PATHS[view];
      if (window.location.pathname !== path) window.history.replaceState({ view }, '', path);
      setCurrentView(view);
      setCurrentCategory('All');
      setVisibleCount(24);
    };

    syncViewFromPath();
    window.addEventListener('popstate', syncViewFromPath);
    return () => window.removeEventListener('popstate', syncViewFromPath);
  }, []);

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setVisibleCount(24);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setVisibleCount(24);
  };

  const getCategories = (): string[] => {
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

    const typeMap: Record<string, ContentType> = {
      GAME: ContentType.GAME, REF: ContentType.REF, VIDEO: ContentType.VIDEO, LIBRARY: ContentType.IMAGE,
    };
    if (typeMap[currentView]) {
      result = result.filter(p => p.type === typeMap[currentView]);
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
        (p.subtitle && p.subtitle.toLowerCase().includes(lowerTerm)) ||
        (p.description && p.description.toLowerCase().includes(lowerTerm))
      );
    }

    return [...result].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
  }, [currentView, currentCategory, searchTerm]);

  const displayPosts = allFilteredPosts;

  const visiblePosts = displayPosts.slice(0, visibleCount);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= displayPosts.length) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleCount((count) => Math.min(count + 24, displayPosts.length));
      }
    }, { rootMargin: '0px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, [displayPosts.length, visibleCount]);

  const tabs = getCategories();

  return (
    <div className="theme-accent min-h-screen w-full font-sans bg-white text-slate-900">
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <main className="min-h-[calc(100vh-4rem)] w-full px-4 py-4 sm:px-6 md:py-6 xl:px-8">
          <section className="min-w-0">
                {tabs.length > 0 && !searchTerm && (
                  <nav aria-label="Categories" className="scrollbar-hide mb-5 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleCategorySelect(tab)}
                        aria-pressed={currentCategory === tab}
                        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${currentCategory === tab ? 'bg-[var(--brand-accent)] text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                )}

                <div className="min-h-[500px]">
                    {visiblePosts.length > 0 ? (
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${currentView === 'VIDEO' || currentView === 'REF' ? 'xl:grid-cols-5' : 'xl:grid-cols-4'}`}>
                        {visiblePosts.map((post: any) => (
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

                    {visibleCount < displayPosts.length && (
                      <div ref={loadMoreRef} role="status" className="py-8 text-center text-sm text-slate-500">
                        Loading more...
                      </div>
                    )}
                </div>
              </section>
      </main>

        <footer className="border-t border-slate-200 px-4 py-6 text-center text-xs leading-relaxed text-slate-500 sm:px-6 xl:px-8">
          <p>WakaMoe is a non-profit database.</p>
          <p>All content belongs to the original rights holders.</p>
        </footer>

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />
    </div>
  );
};

export default App;