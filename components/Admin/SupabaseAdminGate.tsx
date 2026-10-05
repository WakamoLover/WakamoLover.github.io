import React, { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabaseClient';

interface SupabaseAdminGateProps {
  children: ReactNode;
}

type AuthorizationState = 'checking' | 'admin' | 'denied' | 'error';

const inputClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';

const hasAdminFlag = (record: Record<string, unknown> | null): boolean => {
  const value = record?.is_admin;
  return value === true || (typeof value === 'string' && value.trim().toLowerCase() === 'true');
};

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
        setMessage(`Could not check your session: ${error.message}`);
        setSession(null);
        setAuthorization('denied');
      } else {
        setSession(data.session);
      }
      setSessionReady(true);
    }).catch((error: unknown) => {
      if (!isCurrent || hasAuthEvent) return;
      setMessage(`Could not check your session: ${error instanceof Error ? error.message : String(error)}`);
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
        const user = session.user;
        if (import.meta.env.DEV) {
          console.log('Logged In Auth User ID:', user.id);
        }

        let { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if ((error || !data) && user.email) {
          const emailResult = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', user.email)
            .maybeSingle();
          data = emailResult.data;
          error = emailResult.error;
        }

        if (!isCurrent) return;
        if (import.meta.env.DEV) {
          console.log('Admin Table Record:', data);
        }
        if (error) {
          setMessage(`Could not verify admin access: ${error.message}`);
          setAuthorization('error');
        } else {
          setAuthorization(hasAdminFlag(data) ? 'admin' : 'denied');
        }
      } catch (error: unknown) {
        if (!isCurrent) return;
        setMessage(`Could not verify admin access: ${error instanceof Error ? error.message : String(error)}`);
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
      if (error) setMessage(`Sign-in failed: ${error.message}`);
    } catch (error: unknown) {
      setMessage(`Sign-in failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) setMessage(`Sign-out failed: ${error.message}`);
    } catch (error: unknown) {
      setMessage(`Sign-out failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  if (!supabase) {
    return (
      <section role="alert" className="mx-auto mt-8 max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        Admin sign-in is unavailable. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
      </section>
    );
  }

  if (!sessionReady || (session && authorization === 'checking')) {
    return <p role="status" className="mx-auto mt-8 max-w-lg p-5 text-sm text-slate-600">Checking admin session...</p>;
  }

  if (!session) {
    return (
      <section className="mx-auto mt-8 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in with your Supabase Auth account.</p>
        <form onSubmit={handleSignIn} className="mt-5 space-y-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
            Email
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
            Password
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
            {isSigningIn ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    );
  }

  if (authorization !== 'admin') {
    return (
      <section className="mx-auto mt-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-5">
        <h1 className="font-bold text-red-900">Admin Access Restricted</h1>
        <p role={authorization === 'error' ? 'alert' : undefined} className="mt-2 text-sm text-red-800">
          {message || 'This account does not have administrator privileges.'}
        </p>
        <button type="button" onClick={handleSignOut} className="mt-4 rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-900 hover:bg-red-100">
          Log Out
        </button>
      </section>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 justify-end px-4 pt-3 sm:px-6 xl:px-8">
        <button type="button" onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
          Log Out
        </button>
      </div>
      {message && <p role="alert" className="mx-4 mt-2 shrink-0 text-right text-sm text-red-700 sm:mx-6 xl:mx-8">{message}</p>}
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
};

export default SupabaseAdminGate;
