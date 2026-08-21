import { afterEach, describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY, readStoredTheme, writeStoredTheme } from './theme-storage';

describe('Хранение настройки темы', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('возвращает system при отсутствии сохранённой темы', () => {
    expect(readStoredTheme()).toBe('system');
  });

  it('читает сохранённую светлую тему', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');

    expect(readStoredTheme()).toBe('light');
  });

  it('читает сохранённую тёмную тему', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    expect(readStoredTheme()).toBe('dark');
  });

  it('игнорирует неизвестное сохранённое значение', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'purple');

    expect(readStoredTheme()).toBe('system');
  });

  it('сохраняет тему', () => {
    writeStoredTheme('dark');

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });
});
