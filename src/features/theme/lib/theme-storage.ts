import { DEFAULT_THEME, isTheme, type Theme } from '../model/theme';

export const THEME_STORAGE_KEY = 'kanban-board-theme';

export function readStoredTheme(): Theme {
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (!isTheme(value)) {
    return DEFAULT_THEME;
  }

  return value;
}

export function writeStoredTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
