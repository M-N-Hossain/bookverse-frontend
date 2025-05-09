'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import { ToastProvider } from '../components/ToastProvider';
import { store } from './store';

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ReduxProvider store={store}>
      <ErrorBoundary>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ErrorBoundary>
    </ReduxProvider>
  );
} 