import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { applyInitialTheme } from './features/theme/lib/apply-initial-theme';
import './styles/global.css';
import { QueryProvider } from './app/providers/QueryProvider';

applyInitialTheme();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
);
