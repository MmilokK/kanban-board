import { describe, expect, it } from 'vitest';

import { isTheme, resolveTheme } from './theme';

describe('Тема интерфейса', () => {
  it('распознаёт светлую тему', () => {
    expect(isTheme('light')).toBe(true);
  });

  it('распознаёт тёмную тему', () => {
    expect(isTheme('dark')).toBe(true);
  });

  it('распознаёт системную тему', () => {
    expect(isTheme('system')).toBe(true);
  });

  it('отклоняет неизвестное значение', () => {
    expect(isTheme('purple')).toBe(false);
  });

  it('отклоняет значения другого типа', () => {
    expect(isTheme(null)).toBe(false);

    expect(isTheme(123)).toBe(false);
  });

  it('возвращает светлую тему напрямую', () => {
    expect(resolveTheme('light', true)).toBe('light');
  });

  it('возвращает тёмную тему напрямую', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('использует тёмную системную тему', () => {
    expect(resolveTheme('system', true)).toBe('dark');
  });

  it('использует светлую системную тему', () => {
    expect(resolveTheme('system', false)).toBe('light');
  });
});
