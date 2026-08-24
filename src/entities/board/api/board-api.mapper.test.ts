import { describe, expect, it } from 'vitest';
import type { ApiBoard } from './board-api.types';
import { mapApiBoardToState } from './board-api.mapper';

const apiBoard: ApiBoard = {
  id: 'board-1',
  title: 'Рабочая доска',
  role: 'OWNER',
  columns: [
    {
      id: 'todo',
      title: 'To do',
      position: 1,
      isCompleted: false,
      isArchive: false,
    },
    {
      id: 'backlog',
      title: 'Backlog',
      position: 0,
      isCompleted: false,
      isArchive: false,
    },
    {
      id: 'archive',
      title: 'Archive',
      position: 2,
      isCompleted: false,
      isArchive: true,
    },
  ],
  tasks: [
    {
      id: 'task-2',
      columnId: 'backlog',
      title: 'Вторая задача',
      description: '',
      priority: 'low',
      tags: [],
      dueDate: null,
      archivedAt: null,
      position: 1,
      subtasks: [],
      comments: [],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
    {
      id: 'task-1',
      columnId: 'backlog',
      title: 'Первая задача',
      description: '',
      priority: 'medium',
      tags: [],
      dueDate: null,
      archivedAt: null,
      position: 0,
      subtasks: [
        {
          id: 'subtask-1',
          title: 'Подзадача',
          description: 'Описание',
          isCompleted: false,
        },
      ],
      comments: [
        {
          id: 'comment-1',
          text: 'Комментарий',
          createdAt: '2026-08-01T11:00:00.000Z',
          updatedAt: '2026-08-01T11:00:00.000Z',
        },
      ],
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z',
    },
  ],
  createdAt: '2026-08-01T09:00:00.000Z',
  updatedAt: '2026-08-01T12:00:00.000Z',
};

describe('Преобразование данных доски API', () => {
  it('создаёт нормализованное состояние доски', () => {
    const state = mapApiBoardToState(apiBoard);

    expect(state.boards['board-1']).toMatchObject({
      id: 'board-1',
      title: 'Рабочая доска',
      columnIds: ['backlog', 'todo', 'archive'],
    });

    expect(state.columns['backlog']?.taskIds).toEqual(['task-1', 'task-2']);

    expect(state.columns['archive']?.isArchive).toBe(true);
  });

  it('преобразует подзадачи и комментарии', () => {
    const state = mapApiBoardToState(apiBoard);

    expect(state.tasks['task-1']?.subtasks).toEqual([
      {
        id: 'subtask-1',
        title: 'Подзадача',
        description: 'Описание',
        isCompleted: false,
      },
    ]);

    expect(state.tasks['task-1']?.comments).toEqual([
      {
        id: 'comment-1',
        text: 'Комментарий',
        createdAt: '2026-08-01T11:00:00.000Z',
        updatedAt: '2026-08-01T11:00:00.000Z',
      },
    ]);
  });

  it('не доверяет клиенту историю сервера', () => {
    const state = mapApiBoardToState(apiBoard);

    expect(state.tasks['task-1']?.history).toEqual([]);
  });
});
