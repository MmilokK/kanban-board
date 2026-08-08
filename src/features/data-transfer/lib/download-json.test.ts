import { describe, expect, it } from 'vitest';
import { createExportFilename } from './download-json';

describe('Имя экспортируемого файла', () => {
  it('создаёт имя из текущей даты', () => {
    const date = new Date(2026, 7, 8, 19, 5);

    expect(createExportFilename(date)).toBe('kanban-board-2026-08-08-1905.json');
  });
});
