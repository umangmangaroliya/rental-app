"use client";

import { initialize } from '@/store/slices/authSlice';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initialize());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
