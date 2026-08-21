import { renderHook, act } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY } from '../lib/theme-storage';
import { useTheme } from './use-theme';

describe('Управление темой', () => {
  afterEach(() => {
    window.localStorage.clear();

    delete document.documentElement.dataset.theme;

    document.documentElement.style.colorScheme = '';
  });

  it('использует системную тему по умолчанию', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('system');
  });

  it('изменяет тему на тёмную', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');

    expect(document.documentElement.dataset.theme).toBe('dark');

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('изменяет тему на светлую', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('восстанавливает сохранённую тему', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
  });
});
