import { describe, expect, it } from 'vitest';

import { boardStateSchema } from './board-schema';
import { createDemoBoardState } from './demo-board';

describe('boardStateSchema', () => {
  it('принимает демонстрационное состояние', () => {
    const board = createDemoBoardState();

    const result = boardStateSchema.safeParse(board);

    expect(result.success).toBe(true);
  });

  it('отклоняет ссылку на несуществующую задачу', () => {
    const board = createDemoBoardState();

    board.columns.todo.taskIds.push('missing-task');

    const result = boardStateSchema.safeParse(board);

    expect(result.success).toBe(false);
  });

  it('отклоняет задачу в двух колонках', () => {
    const board = createDemoBoardState();

    const sourceColumnId = board.columnOrder.find(
      (columnId) => board.columns[columnId].taskIds.length > 0,
    );

    if (!sourceColumnId) {
      throw new Error('В демонстрационной доске нет задач');
    }

    const taskId = board.columns[sourceColumnId].taskIds[0];

    if (!taskId) {
      throw new Error('Не удалось получить задачу');
    }

    const targetColumnId = board.columnOrder.find((columnId) => columnId !== sourceColumnId);

    if (!targetColumnId) {
      throw new Error('Не удалось получить целевую колонку');
    }

    board.columns[targetColumnId].taskIds.push(taskId);

    const result = boardStateSchema.safeParse(board);

    expect(result.success).toBe(false);
  });

  it('отклоняет несовпадение ключа и id задачи', () => {
    const board = createDemoBoardState();

    const taskId = Object.keys(board.tasks)[0];

    if (!taskId) {
      throw new Error('В демонстрационной доске нет задач');
    }

    const task = board.tasks[taskId];

    if (!task) {
      throw new Error('Не удалось получить задачу');
    }

    task.id = 'different-task-id';

    const result = boardStateSchema.safeParse(board);

    expect(result.success).toBe(false);
  });
});
