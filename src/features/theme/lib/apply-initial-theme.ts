import { readStoredTheme } from './theme-storage';

import { resolveTheme } from '../model/theme';

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export function applyInitialTheme(): void {
  const theme = readStoredTheme();

  const prefersDark = window.matchMedia(DARK_MEDIA_QUERY).matches;

  const resolvedTheme = resolveTheme(theme, prefersDark);

  document.documentElement.dataset.theme = resolvedTheme;

  document.documentElement.style.colorScheme = resolvedTheme;
}
