import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Header from './components/Layout';
import PostCard from './components/Content/PostCard';
import ImageModal from './components/Content/ImageModal';
import CardAdmin from './components/Admin/CardAdmin';
import CardEditorModal from './components/Admin/CardEditorModal';
import { MOCK_POSTS, CATEGORY_TABS } from './constants/index';
import { ContentType, type Post } from './types';
import { deleteCard as deleteCardFromDatabase, fetchCards, insertCard, seedCards, updateCard } from './lib/cards';
import { type EditableCard } from './lib/cards';
import { adminEmail, isSupabaseConfigured, supabase } from './lib/supabase';

const VIEW_PATHS: Record<string, string> = {
  CREATOR: '/creator',
  VIDEO: '/media',
  GAME: '/game',
  REF: '/reference',
};

const getViewFromPath = () => {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  return Object.entries(VIEW_PATHS).find(([, path]) => path === pathname)?.[0] || 'GAME';
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
  const [cards, setCards] = useState<Post[]>(isSupabaseConfigured ? [] : MOCK_POSTS);
  const [isCardsLoaded, setIsCardsLoaded] = useState(!isSupabaseConfigured);
  const [isDatabaseEmpty, setIsDatabaseEmpty] = useState(false);
  const [cardsError, setCardsError] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let isMounted = true;
    void fetchCards().then((databaseCards) => {
      if (!isMounted) return;
      setIsCardsLoaded(true);
      setIsDatabaseEmpty(databaseCards.length === 0);
      setCards(databaseCards);
    }).catch((error: unknown) => {
      if (!isMounted) return;
      setCardsError(error instanceof Error ? error.message : String(error));
      setCards(MOCK_POSTS);
      setIsCardsLoaded(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAdminChange = useCallback((active: boolean) => {
    setIsAdmin(active);
  }, []);

  const handleSaveCard = async (post: EditableCard, id?: string) => {
  setAdminError('');
  try {
    const savedCard = id ? await updateCard(id, post) : await insertCard(post);
    setCards((currentCards) => 
      id 
        ? currentCards.map((card) => (card.id === id ? savedCard : card))
        : [...currentCards, savedCard]
    );
    setIsDatabaseEmpty(false);
    setVisibleCount(24);
  } catch (error) {
    setAdminError(error instanceof Error ? error.message : String(error));
  }
};

  const handleDeleteCard = async (post: Post) => {
    if (!window.confirm(`Delete “${post.title}”?`)) return;
    setAdminError('');
    try {
      await deleteCardFromDatabase(post.id);
      setCards((currentCards) => currentCards.filter((card) => card.id !== post.id));
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleSeedCards = async () => {
    const importedCards = await seedCards(MOCK_POSTS);
    setCards(importedCards);
    setIsDatabaseEmpty(false);
    setIsCardsLoaded(true);
  };

  const handleNavigate = (view: string) => {
    const nextView = VIEW_PATHS[view] ? view : 'GAME';
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
    let result = cards.map((post) => {
      let url = '';
      if (post.type === ContentType.VIDEO) {
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
      GAME: ContentType.GAME, REF: ContentType.REF, VIDEO: ContentType.VIDEO, CREATOR: ContentType.IMAGE,
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
  }, [cards, currentView, currentCategory, searchTerm]);

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

      <div className="px-4 pt-4 sm:px-6 xl:px-8">
        <CardAdmin
          isCardsLoaded={isCardsLoaded}
          isDatabaseEmpty={isDatabaseEmpty}
          hasCardsError={Boolean(cardsError)}
          editorOpen={editorOpen}
          editingPost={editingPost}
          onAdminChange={handleAdminChange}
          onCreate={() => {
            setEditingPost(null);
            setEditorOpen(true);
          }}
          onCloseEditor={() => setEditorOpen(false)}
          onSave={handleSaveCard}
          onSeed={handleSeedCards}
        />
        {(cardsError || adminError) && (
          <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {cardsError ? `Could not load cards from Supabase: ${cardsError}` : `Card operation failed: ${adminError}`}
          </p>
        )}
        {isSupabaseConfigured && !isCardsLoaded && (
          <p role="status" className="mb-4 text-sm text-slate-500">Loading cards from Supabase...</p>
        )}
      </div>

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
                        {visiblePosts.map((post) => (
                          <div key={post.id} className="min-w-0">
                            {isAdmin && isCardsLoaded && !cardsError && !isDatabaseEmpty && (
                              <div className="mb-2 flex justify-end gap-2">
                                <button type="button" onClick={() => {
                                  setEditingPost(post);
                                  setEditorOpen(true);
                                }} className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100">Edit</button>
                                <button type="button" onClick={() => void handleDeleteCard(post)} className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50">Delete</button>
                              </div>
                            )}
                            <PostCard
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
                          </div>
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

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={currentImageUrl} />[cite: 9]

      {editorOpen && (
        <CardEditorModal
          post={editingPost}
          onClose={() => setEditorOpen(false)}
          onSave={handleSaveCard}
        />
      )}
    </div>
  );
};

export default App;