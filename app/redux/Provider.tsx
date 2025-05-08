'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
} 