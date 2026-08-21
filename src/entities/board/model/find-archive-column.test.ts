import { describe, expect, it } from 'vitest';
import type { Column } from '../../column/model/types';
import { findArchiveColumn } from './find-archive-column';

describe('Поиск архивной колонки', () => {
  it('находит архивную колонку доски', () => {
    const regularColumn: Column = {
      id: 'regular',
      boardId: 'board-1',

      title: 'Backlog',

      taskIds: [],

      isCompleted: false,
      isArchive: false,
    };

    const archiveColumn: Column = {
      id: 'archive',
      boardId: 'board-1',

      title: 'Archive',

      taskIds: [],

      isCompleted: false,
      isArchive: true,
    };

    expect(
      findArchiveColumn(
        {
          regular: regularColumn,
          archive: archiveColumn,
        },
        'board-1',
      ),
    ).toEqual(archiveColumn);
  });

  it('не возвращает архив другой доски', () => {
    const archiveColumn: Column = {
      id: 'archive',
      boardId: 'board-2',

      title: 'Archive',

      taskIds: [],

      isCompleted: false,
      isArchive: true,
    };

    expect(
      findArchiveColumn(
        {
          archive: archiveColumn,
        },
        'board-1',
      ),
    ).toBeUndefined();
  });
});
