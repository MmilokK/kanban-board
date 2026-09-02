import { describe, expect, it } from 'vitest';
import { createBoardBundle } from './board-factory';

const BOARD_ID = 'board-1';

const CREATED_AT = '2026-08-03T10:00:00.000Z';

const COLUMN_IDS = {
  backlog: 'column-backlog',
  todo: 'column-todo',
  inProgress: 'column-in-progress',
  done: 'column-done',
  archive: 'column-archive',
};

function createTestBoardBundle() {
  return createBoardBundle({
    boardId: BOARD_ID,
    title: 'Рабочая доска',
    columnIds: COLUMN_IDS,
    createdAt: CREATED_AT,
  });
}

describe('Фабрика доски', () => {
  it('создаёт доску с переданными данными', () => {
    const { board } = createTestBoardBundle();

    expect(board).toEqual({
      id: BOARD_ID,
      title: 'Рабочая доска',
      role: 'OWNER',
      columnIds: [
        COLUMN_IDS.backlog,
        COLUMN_IDS.todo,
        COLUMN_IDS.inProgress,
        COLUMN_IDS.done,
        COLUMN_IDS.archive,
      ],
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
    });
  });

  it('создаёт четыре стандартные колонки', () => {
    const { columns } = createTestBoardBundle();

    expect(Object.keys(columns)).toHaveLength(5);

    expect(Object.keys(columns)).toEqual(
      expect.arrayContaining([
        COLUMN_IDS.backlog,
        COLUMN_IDS.todo,
        COLUMN_IDS.inProgress,
        COLUMN_IDS.done,
        COLUMN_IDS.archive,
      ]),
    );
  });

  it('сохраняет колонки в правильном порядке', () => {
    const { board } = createTestBoardBundle();

    expect(board.columnIds).toEqual([
      COLUMN_IDS.backlog,
      COLUMN_IDS.todo,
      COLUMN_IDS.inProgress,
      COLUMN_IDS.done,
      COLUMN_IDS.archive,
    ]);
  });

  it('связывает все колонки с созданной доской', () => {
    const { columns } = createTestBoardBundle();

    for (const column of Object.values(columns)) {
      expect(column.boardId).toBe(BOARD_ID);
    }
  });

  it('создаёт все колонки без задач', () => {
    const { columns } = createTestBoardBundle();

    for (const column of Object.values(columns)) {
      expect(column.taskIds).toEqual([]);
    }
  });

  it('помечает только колонку Done как завершённую', () => {
    const { columns } = createTestBoardBundle();

    const completedColumns = Object.values(columns).filter((column) => column.isCompleted);

    expect(completedColumns).toHaveLength(1);

    expect(completedColumns[0]?.id).toBe(COLUMN_IDS.done);
  });
});
