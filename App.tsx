import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Layout';
import PostCard from './components/Content/PostCard';
import ImageModal from './components/Content/ImageModal';
import SupabaseAdminGate from './components/Admin/SupabaseAdminGate';
import SupabaseCardAdmin from './components/Admin/SupabaseCardAdmin';
import InteractiveBackground from './components/Background/InteractiveBackground';
import { CATEGORY_TABS } from './constants/categories';
import { useRealtimePosts } from './src/hooks/useRealtimePosts';
import { ContentType } from './types';

const VIEW_PATHS: Record<string, string> = {
  CREATOR: '/creator',
  MEDIA: '/media',
  GAME: '/game',
  REF: '/reference',
};

const getViewFromPath = () => {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return Object.entries(VIEW_PATHS).find(([, path]) => path === pathname)?.[0] || 'GAME';
};

const hasAdminQuery = () => new URLSearchParams(window.location.search).has('yukina');

const getCoverImage = (coverImage?: string): string => {
  const source = coverImage?.trim();
  if (!source) return 'https://placehold.co/400x225?text=No+Cover+Image';
  if (/^(https?:|data:|blob:)/i.test(source)) return source;
  if (source.startsWith('//')) return `https:${source}`;
  if (source.startsWith('/')) return source;
  return `/media/${source.replace(/^media\//i, '').replace(/^\/+/, '')}`;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState(getViewFromPath);
  const [isAdminRoute, setIsAdminRoute] = useState(hasAdminQuery);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);
  const { posts, setPosts, isLoading, error } = useRealtimePosts();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const handleNavigate = (view: string) => {
    const nextView = VIEW_PATHS[view] ? view : 'GAME';
    const nextPath = VIEW_PATHS[nextView];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view: nextView }, '', nextPath);
    }
    setIsAdminRoute(hasAdminQuery());
    setCurrentView(nextView);
    setCurrentCategory('All'); 
    setVisibleCount(24);
  };

  useEffect(() => {
    const syncViewFromPath = () => {
      const view = getViewFromPath();
      const path = VIEW_PATHS[view];
      if (window.location.pathname !== path) {
        window.history.replaceState({ view }, '', `${path}${window.location.search}${window.location.hash}`);
      }
      setIsAdminRoute(hasAdminQuery());
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
    let result = posts.map((post) => {
      let url = '';
      if (post.type === ContentType.MEDIA) {
        url = post.externalLink || post.channelUrl || post.videoUrl || '';
      } else if (post.type === ContentType.GAME) {
        url = '';
      } else {
        url = post.externalLink || post.channelUrl || post.videoUrl || '';
      }

      const thumbnail = getCoverImage(post.coverImage);

      return {
        ...post,
        originalUrl: url,
        thumbnail,
      };
    });

    const typeMap: Record<string, ContentType> = {
      GAME: ContentType.GAME, REF: ContentType.REF, MEDIA: ContentType.MEDIA, CREATOR: ContentType.CREATOR,
    };
    const selectedType = typeMap[currentView.toUpperCase()];
    if (selectedType) {
      result = result.filter(p => p.type.trim().toUpperCase() === selectedType);
    }

    if (currentCategory !== 'All') {
      result = result.filter(p => {
        if (Array.isArray(p.category)) {
          return p.category.some(category => category.toLocaleLowerCase() === currentCategory.toLocaleLowerCase());
        } else {
          return p.category?.toLocaleLowerCase() === currentCategory.toLocaleLowerCase();
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
  }, [posts, currentView, currentCategory, searchTerm]);

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
    <div className={`theme-accent relative isolate w-full font-sans bg-transparent text-slate-900 ${isAdminRoute ? 'flex h-dvh flex-col overflow-hidden' : 'min-h-screen'}`}>
      <InteractiveBackground />
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      {isAdminRoute && (
        <SupabaseAdminGate>
          <SupabaseCardAdmin
            posts={posts}
            isLoading={isLoading}
            onPostsChange={(updatedPosts) => {
              setPosts(updatedPosts);
              setVisibleCount(24);
            }}
          />
        </SupabaseAdminGate>
      )}

      <main className={`${isAdminRoute ? 'hidden' : 'min-h-[calc(100vh-4rem)]'} w-full px-4 pb-4 pt-5 sm:px-6 md:pb-6 xl:px-8`}>
          <section className="min-w-0">
                {error && (
                  <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    Could not load live posts: {error}
                  </p>
                )}
                {tabs.length > 0 && !searchTerm && (
                  <nav aria-label="Categories" className="category-tabs no-invert scrollbar-hide mb-5 mt-8 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => handleCategorySelect(tab)}
                        aria-pressed={currentCategory === tab}
                        className="category-tab shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-200"
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                )}

                <div className="min-h-[500px]">
                    {isLoading ? (
                      <p role="status" className="py-32 text-center text-sm text-slate-500">Loading posts...</p>
                    ) : visiblePosts.length > 0 ? (
                      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${currentView === 'MEDIA' || currentView === 'REF' ? 'xl:grid-cols-5' : 'xl:grid-cols-4'}`}>
                        {visiblePosts.map((post) => (
                          <div key={post.id} className="min-w-0">
                            <PostCard
                              post={post}
                              viewMode={currentView}
                              onImageClick={(imgUrl: string) => {
                                if (post.type === ContentType.CREATOR && post.originalUrl.includes('x.com')) {
                                  window.open(post.originalUrl, '_blank');
                                } else {
                                  setCurrentImageUrl(imgUrl);
                                  setIsImageModalOpen(true);
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-32 text-center text-gray-500">
                        {error ? 'Posts could not be loaded. Check the error above and try again.' : 'No content found.'}
                      </div>
                    )}

                    {visibleCount < displayPosts.length && (
                      <div ref={loadMoreRef} role="status" className="py-8 text-center text-sm text-slate-500">
                        Loading more...
                      </div>
                    )}
                </div>
              </section>
      </main>

        <footer className={`${isAdminRoute ? 'hidden' : ''} border-t border-slate-200 px-4 py-6 text-center text-xs leading-relaxed text-slate-500 sm:px-6 xl:px-8`}>
          <p>WakaMoe is a non-profit database.</p>
          <p>All content belongs to the original rights holders.</p>
        </footer>

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />[cite: 9]
    </div>
  );
};

export default App;