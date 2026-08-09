import { useEffect, useState } from 'react';

import { readStoredTheme, writeStoredTheme } from '../lib/theme-storage';

import { resolveTheme, type ResolvedTheme, type Theme } from './theme';

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getSystemPrefersDark(): boolean {
  return window.matchMedia(DARK_MEDIA_QUERY).matches;
}

function applyResolvedTheme(theme: ResolvedTheme): void {
  document.documentElement.dataset.theme = theme;

  document.documentElement.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);

  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark);

  const resolvedTheme = resolveTheme(theme, systemPrefersDark);

  useEffect(() => {
    applyResolvedTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);

    function handleChange(event: MediaQueryListEvent) {
      setSystemPrefersDark(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  function setTheme(nextTheme: Theme) {
    writeStoredTheme(nextTheme);

    setThemeState(nextTheme);
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
  };
}
