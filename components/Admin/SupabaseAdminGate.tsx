import React, { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabaseClient';

interface SupabaseAdminGateProps {
  children: ReactNode;
}

type AuthorizationState = 'checking' | 'admin' | 'denied' | 'error';

const inputClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';

const SupabaseAdminGate: React.FC<SupabaseAdminGateProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [authorization, setAuthorization] = useState<AuthorizationState>('checking');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabase) {
      setSessionReady(true);
      return;
    }

    let isCurrent = true;
    let hasAuthEvent = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      hasAuthEvent = true;
      setSession(nextSession);
      setSessionReady(true);
      setMessage('');
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isCurrent || hasAuthEvent) return;
      if (error) {
        setMessage(`세션을 확인하지 못했습니다: ${error.message}`);
        setSession(null);
        setAuthorization('denied');
      } else {
        setSession(data.session);
      }
      setSessionReady(true);
    }).catch((error: unknown) => {
      if (!isCurrent || hasAuthEvent) return;
      setMessage(`세션을 확인하지 못했습니다: ${error instanceof Error ? error.message : String(error)}`);
      setSession(null);
      setAuthorization('denied');
      setSessionReady(true);
    });

    return () => {
      isCurrent = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !session) {
      setAuthorization('denied');
      return;
    }

    let isCurrent = true;
    setAuthorization('checking');

    void (async () => {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('is_admin')
          .eq('user_id', session.user.id)
          .maybeSingle();
        if (!isCurrent) return;
        if (error) {
          setMessage(`관리자 권한을 확인하지 못했습니다: ${error.message}`);
          setAuthorization('error');
        } else {
          setAuthorization(data?.is_admin === true ? 'admin' : 'denied');
        }
      } catch (error: unknown) {
        if (!isCurrent) return;
        setMessage(`관리자 권한을 확인하지 못했습니다: ${error instanceof Error ? error.message : String(error)}`);
        setAuthorization('error');
      }
    })();

    return () => {
      isCurrent = false;
    };
  }, [session?.user.id]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setIsSigningIn(true);
    setMessage('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(`로그인에 실패했습니다: ${error.message}`);
    } catch (error: unknown) {
      setMessage(`로그인에 실패했습니다: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) setMessage(`로그아웃에 실패했습니다: ${error.message}`);
    } catch (error: unknown) {
      setMessage(`로그아웃에 실패했습니다: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  if (!supabase) {
    return (
      <section role="alert" className="mx-auto mt-8 max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        관리자 로그인을 사용할 수 없습니다. VITE_SUPABASE_URL 및 VITE_SUPABASE_ANON_KEY를 설정해 주세요.
      </section>
    );
  }

  if (!sessionReady || (session && authorization === 'checking')) {
    return <p role="status" className="mx-auto mt-8 max-w-lg p-5 text-sm text-slate-600">관리자 세션을 확인하는 중...</p>;
  }

  if (!session) {
    return (
      <section className="mx-auto mt-8 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">관리자 로그인</h1>
        <p className="mt-2 text-sm text-slate-600">Supabase Auth 계정으로 로그인해 주세요.</p>
        <form onSubmit={handleSignIn} className="mt-5 space-y-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            이메일
            <input
              className={inputClassName}
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            비밀번호
            <input
              className={inputClassName}
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
          >
            {isSigningIn ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </section>
    );
  }

  if (authorization !== 'admin') {
    return (
      <section className="mx-auto mt-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-5">
        <h1 className="font-bold text-red-900">관리자 접근이 제한되었습니다</h1>
        <p role={authorization === 'error' ? 'alert' : undefined} className="mt-2 text-sm text-red-800">
          {message || '로그인된 계정에 관리자 권한이 없습니다.'}
        </p>
        <button type="button" onClick={handleSignOut} className="mt-4 rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-900 hover:bg-red-100">
          로그아웃
        </button>
      </section>
    );
  }

  return (
    <>
      <div className="flex justify-end px-4 pt-3 sm:px-6 xl:px-8">
        <button type="button" onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
          관리자 로그아웃
        </button>
      </div>
      {message && <p role="alert" className="mx-4 mt-2 text-right text-sm text-red-700 sm:mx-6 xl:mx-8">{message}</p>}
      {children}
    </>
  );
};

export default SupabaseAdminGate;
