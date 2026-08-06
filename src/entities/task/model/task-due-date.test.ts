import { describe, expect, it } from 'vitest';

import {
  formatTaskDueDate,
  getLocalDateValue,
  getTaskDueStatus,
  isValidDateValue,
} from './task-due-date';

describe('Срок выполнения задачи', () => {
  it('проверяет корректную дату', () => {
    expect(isValidDateValue('2026-08-06')).toBe(true);
  });

  it('отклоняет невозможную дату', () => {
    expect(isValidDateValue('2026-02-31')).toBe(false);
  });

  it('возвращает локальную дату', () => {
    expect(getLocalDateValue(new Date(2026, 7, 6, 23, 30))).toBe('2026-08-06');
  });

  it('определяет просроченную задачу', () => {
    expect(getTaskDueStatus('2026-08-05', false, '2026-08-06')).toBe('overdue');
  });

  it('определяет задачу на сегодня', () => {
    expect(getTaskDueStatus('2026-08-06', false, '2026-08-06')).toBe('today');
  });

  it('определяет будущий срок', () => {
    expect(getTaskDueStatus('2026-08-07', false, '2026-08-06')).toBe('upcoming');
  });

  it('не считает завершённую задачу просроченной', () => {
    expect(getTaskDueStatus('2026-08-01', true, '2026-08-06')).toBe('completed');
  });

  it('форматирует дату для отображения', () => {
    expect(formatTaskDueDate('2026-08-06')).toBe('06.08.2026');
  });
});
