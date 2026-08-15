import { describe, expect, it } from 'vitest';
import { formatTaskHistoryEvent } from './format-task-history-event';

describe('Форматирование истории задачи', () => {
  it('форматирует создание задачи', () => {
    expect(
      formatTaskHistoryEvent({
        id: 'history-1',
        type: 'task-created',
        createdAt: '2026-08-13T10:00:00.000Z',
      }),
    ).toBe('Задача создана');
  });

  it('форматирует перемещение задачи', () => {
    expect(
      formatTaskHistoryEvent({
        id: 'history-1',
        type: 'task-moved',
        fromColumn: {
          id: 'backlog',
          title: 'Backlog',
        },
        toColumn: {
          id: 'done',
          title: 'Done',
        },
        createdAt: '2026-08-13T10:00:00.000Z',
      }),
    ).toBe('Задача перемещена: Backlog → Done');
  });

  it('форматирует выполнение подзадачи', () => {
    expect(
      formatTaskHistoryEvent({
        id: 'history-1',
        type: 'subtask-completed',
        subtaskId: 'subtask-1',
        title: 'Написать тесты',
        createdAt: '2026-08-13T10:00:00.000Z',
      }),
    ).toBe('Подзадача «Написать тесты» выполнена');
  });

  it('форматирует изменение приоритета', () => {
    expect(
      formatTaskHistoryEvent({
        id: 'history-1',
        type: 'task-updated',
        changes: {
          priority: {
            from: 'low',
            to: 'high',
          },
        },

        createdAt: '2026-08-13T10:00:00.000Z',
      }),
    ).toBe('Приоритет: Низкий → Высокий');
  });
});
