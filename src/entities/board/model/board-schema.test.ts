import { describe, expect, it } from 'vitest';
import { parseAppState } from './board-schema';
import { createDemoAppState } from './demo-board';
import { migratePersistedBoardState } from './board-storage';

describe('appStateSchema', () => {
  it('принимает демонстрационное состояние', () => {
    expect(() => parseAppState(createDemoAppState())).not.toThrow();
  });

  it('отклоняет неизвестную активную доску', () => {
    const state = createDemoAppState();

    state.activeBoardId = 'missing-board';

    expect(() => parseAppState(state)).toThrow();
  });

  it('отклоняет отсутствующую колонку', () => {
    const state = createDemoAppState();

    delete state.columns.todo;

    expect(() => parseAppState(state)).toThrow();
  });

  it('отклоняет колонку, назначенную другой доске', () => {
    const state = createDemoAppState();

    state.columns.todo!.boardId = 'another-board';

    expect(() => parseAppState(state)).toThrow();
  });

  it('отклоняет непривязанную задачу', () => {
    const state = createDemoAppState();

    state.tasks['orphan-task'] = {
      id: 'orphan-task',
      title: 'Orphan',
      description: '',
      priority: 'low',
      tags: [],
      dueDate: null,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    expect(() => parseAppState(state)).toThrow();
  });

  it('отклоняет задачу, на которую ссылаются дважды', () => {
    const state = createDemoAppState();

    const taskId = state.columns.backlog?.taskIds[0];

    if (!taskId) {
      throw new Error('Test requires a backlog task');
    }

    state.columns.todo?.taskIds.push(taskId);

    expect(() => parseAppState(state)).toThrow();
  });

  it('добавляет пустой срок задачам версии 2', () => {
    const stateV2 = {
      tasks: {
        'task-1': {
          id: 'task-1',
          title: 'Задача',
          description: '',
          priority: 'medium',
          tags: [],
          createdAt: '2026-08-01T10:00:00.000Z',
          updatedAt: '2026-08-01T10:00:00.000Z',
        },
      },
      schemaVersion: 2,
    };

    const result = migratePersistedBoardState(stateV2, 2);

    expect(result.tasks['task-1']?.dueDate).toBeNull();

    expect(result.schemaVersion).toBe(3);
  });
});
