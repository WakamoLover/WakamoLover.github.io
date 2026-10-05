import React, { useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { ContentType, type Post } from '../../types';
import type { EditableCard } from '../../lib/cards';
import { isCardType, isSupabaseConfigured, supabase } from '../../lib/supabase';

interface CardAdminProps {
  isCardsLoaded: boolean;
  isDatabaseEmpty: boolean;
  hasCardsError: boolean;
  editorOpen: boolean;
  editingPost: Post | null;
  onAdminChange: (isAdmin: boolean) => void;
  onCreate: () => void;
  onCloseEditor: () => void;
  onSave: (card: EditableCard) => Promise<void>;
  onSeed: () => Promise<void>;
}

const labelClassName = 'flex flex-col gap-1 text-xs font-semibold text-slate-600';
const inputClassName = 'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-normal text-slate-800 outline-none focus:border-slate-500';

const CardAdmin: React.FC<CardAdminProps> = ({
  isCardsLoaded,
  isDatabaseEmpty,
  hasCardsError,
  onCreate,
  onSeed,
  onAdminChange,
}) => {
  const adminEmail = import.meta.env.VITE_SUPABASE_ADMIN_EMAIL || '';

  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAdminBtn, setShowAdminBtn] = useState(false);

  const isAdmin = Boolean(user?.email && adminEmail && user.email.toLowerCase() === adminEmail.toLowerCase());

  // URL 파라미터 감지 로직 강화
  useEffect(() => {
    const checkYukina = () => {
      const url = window.location.href;
      if (url.includes('yukina')) {
        setShowAdminBtn(true);
        setLoginOpen(true); // 로그인 입력폼 바로 열기
      }
    };

    checkYukina();
    window.addEventListener('popstate', checkYukina);
    return () => window.removeEventListener('popstate', checkYukina);
  }, []);

  useEffect(() => {
    onAdminChange(isAdmin);
  }, [isAdmin, onAdminChange]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let isMounted = true;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
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
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setIsBusy(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setPassword('');
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    setIsBusy(true);
    try {
      await supabase.auth.signOut();
    } catch (error: unknown) {
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
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsBusy(false);
    }
  };

  // showAdminBtn이 false이고 로그인된 사용자가 없으면 영역 자체를 숨김
  if (!showAdminBtn && !user) {
    return null;
  }

  return (
    <section className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      {isAdmin ? (
        <>
          <span className="text-sm font-semibold text-emerald-800">Administrator: {user?.email}</span>
          {isDatabaseEmpty ? (
            <button type="button" onClick={handleSeed} disabled={isBusy} className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {isBusy ? 'Importing...' : 'Import existing cards into Supabase'}
            </button>
          ) : !isCardsLoaded || hasCardsError ? (
            <span className="text-sm text-slate-600">Card editing is unavailable until the Supabase data loads successfully.</span>
          ) : (
            <button type="button" onClick={onCreate} disabled={isBusy} className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              Add card
            </button>
          )}
          <button type="button" onClick={handleSignOut} disabled={isBusy} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">
            Sign out
          </button>
        </>
      ) : user ? (
        <>
          <span className="text-sm text-slate-600">Signed in as {user.email}; this account is not the configured administrator.</span>
          <button type="button" onClick={handleSignOut} disabled={isBusy} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50">Sign out</button>
        </>
      ) : (
        <div className="w-full">
          <button type="button" onClick={() => { setLoginOpen((open) => !open); setErrorMessage(''); }} className="mb-3 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Administrator sign in
          </button>
          {loginOpen && (
            <form onSubmit={handleSignIn} className="flex w-full flex-wrap items-end gap-3">
              <label className={labelClassName}>
                Email
                <input type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClassName} />
              </label>
              <label className={labelClassName}>
                Password
                <input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClassName} />
              </label>
              <button type="submit" disabled={isBusy} className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{isBusy ? 'Signing in...' : 'Sign in'}</button>
            </form>
          )}
        </div>
      )}
      {isDatabaseEmpty && isAdmin && <p className="w-full text-sm text-slate-600">The Supabase table is empty. Import the current cards before editing them.</p>}
      {errorMessage && <p role="alert" className="w-full text-sm text-red-700">{errorMessage}</p>}
    </section>
  );
};

export default CardAdmin;