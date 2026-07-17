'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { hydrateAuthSession, makeStore, type AppStore } from '@/store';
import type { AuthUser } from '@/types';

const AUTH_STORAGE_KEY = 'starsoft-user-session';

type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;

    if (!store) {
      return;
    }

    const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedSession) {
      try {
        store.dispatch(hydrateAuthSession(JSON.parse(storedSession) as AuthUser));
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    const unsubscribe = store.subscribe(() => {
      const {
        auth: { user },
      } = store.getState();

      if (user) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        return;
      }

      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    });

    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
