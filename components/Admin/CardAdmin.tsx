import React, { useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { ContentType, type Post } from '../../types';
import type { EditableCard } from '../../lib/cards';
import { adminEmail, isCardType, isSupabaseConfigured, supabase } from '../../lib/supabase';

interface CardAdminProps {
  isCardsLoaded: boolean;
  isDatabaseEmpty: boolean;
  hasCardsError: boolean;
  editorOpen: boolean;
  editingPost: Post | null;
  onAdminChange: (isAdmin: boolean) => void;
  onCreate: () => void;
  onCloseEditor: () => void;
  onSave: (post: EditableCard, id?: string) => Promise<void>;
  onSeed: () => Promise<void>;
}

interface CardFormValues {
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  iconImage: string;
  type: ContentType;
  category: string;
  tags: string;
  videoUrl: string;
  channelUrl: string;
  externalLink: string;
  gameLinks: string;
  imageIndex: string;
  sliderImages: string;
}

const emptyForm: CardFormValues = {
  title: '',
  subtitle: '',
  description: '',
  coverImage: '',
  iconImage: '',
  type: ContentType.GAME,
  category: '',
  tags: '',
  videoUrl: '',
  channelUrl: '',
  externalLink: '',
  gameLinks: '',
  imageIndex: '',
  sliderImages: '',
};

const formFromPost = (post: Post | null): CardFormValues => post ? {
  title: post.title,
  subtitle: post.subtitle ?? '',
  description: post.description,
  coverImage: post.coverImage,
  iconImage: post.iconImage ?? '',
  type: post.type,
  category: post.category ?? '',
  tags: post.tags?.join(', ') ?? '',
  videoUrl: post.videoUrl ?? '',
  channelUrl: post.channelUrl ?? '',
  externalLink: post.externalLink ?? '',
  gameLinks: post.gameLinks?.map(({ label, url }) => `${label} | ${url}`).join('\n') ?? '',
  imageIndex: post.imageIndex?.toString() ?? '',
  sliderImages: post.sliderImages?.join('\n') ?? '',
} : emptyForm;

const toEditableCard = (values: CardFormValues): EditableCard => {
  const gameLinks = values.gameLinks.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const separator = line.indexOf('|');
    if (separator < 1 || !line.slice(separator + 1).trim()) {
      throw new Error('Enter each game link as “label | URL”.');
    }
    return { label: line.slice(0, separator).trim(), url: line.slice(separator + 1).trim() };
  });
  const imageIndex = values.imageIndex.trim() ? Number(values.imageIndex) : undefined;
  if (imageIndex !== undefined && !Number.isInteger(imageIndex)) {
    throw new Error('Image index must be a whole number.');
  }

  return {
    title: values.title.trim(),
    subtitle: values.subtitle.trim() || undefined,
    description: values.description.trim(),
    coverImage: values.coverImage.trim(),
    iconImage: values.iconImage.trim() || undefined,
    type: values.type,
    category: values.category.trim() || undefined,
    tags: values.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    videoUrl: values.videoUrl.trim() || undefined,
    channelUrl: values.channelUrl.trim() || undefined,
    externalLink: values.externalLink.trim() || undefined,
    gameLinks,
    imageIndex,
    sliderImages: values.sliderImages.split('\n').map((image) => image.trim()).filter(Boolean),
  };
};

const inputClassName = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[var(--brand-accent)]';
const labelClassName = 'block text-sm font-medium text-slate-700';

const CardAdmin: React.FC<CardAdminProps> = ({
  isCardsLoaded,
  isDatabaseEmpty,
  hasCardsError,
  editorOpen,
  editingPost,
  onAdminChange,
  onCreate,
  onCloseEditor,
  onSave,
  onSeed,
}) => {
  const adminEmail = import.meta.env.VITE_SUPABASE_ADMIN_EMAIL || '';
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
  const [values, setValues] = useState<CardFormValues>(emptyForm);
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isAdmin = Boolean(user?.email && adminEmail && user.email.toLowerCase() === adminEmail.toLowerCase());
  const [showAdminBtn, setShowAdminBtn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('yukina')) {
      setShowAdminBtn(true);
      setLoginOpen(true);
    }
  }, []);
  
  useEffect(() => {
    onAdminChange(isAdmin);
  }, [isAdmin, onAdminChange]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setUser(session?.user ?? null);
    });
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setUser(data.session?.user ?? null);
    }).catch((error: unknown) => {
      if (isMounted) setErrorMessage(error instanceof Error ? error.message : String(error));
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (editorOpen) {
      setValues(formFromPost(editingPost));
      setErrorMessage('');
    }
  }, [editorOpen, editingPost]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setIsBusy(true);
    setErrorMessage('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) throw signOutError;
        throw new Error('This account is not configured as the card administrator.');
      }
      setPassword('');
      setLoginOpen(false);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    setIsBusy(true);
    setErrorMessage('');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);
    setErrorMessage('');
    try {
      const post = toEditableCard(values);
      if (!post.title) throw new Error('Title is required.');
      await onSave(post, editingPost?.id);
      onCloseEditor();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSeed = async () => {
    setIsBusy(true);
    setErrorMessage('');
    try {
      await onSeed();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  const updateField = <K extends keyof CardFormValues>(key: K, value: CardFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  if (!isSupabaseConfigured) return null;

return (
    <section className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
      {/* 테스트용: yukina 조건 없이 무조건 로그인 버튼 노출 */}
      <button
        type="button"
        onClick={() => {
          setLoginOpen((open) => !open);
          setErrorMessage('');
        }}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Administrator sign in
      </button>

      {loginOpen && (
        <form onSubmit={handleSignIn} className="flex w-full flex-wrap items-end gap-3">
          <label className={labelClassName}>
            Email
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
            />
          </label>
          <label className={labelClassName}>
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName}
            />
          </label>
          <button
            type="submit"
            disabled={isBusy}
            className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isBusy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      )}

      {errorMessage && <p role="alert" className="w-full text-sm text-red-700">{errorMessage}</p>}
    </section>
  );
};

export default CardAdmin;