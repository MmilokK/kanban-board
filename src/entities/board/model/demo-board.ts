import { BOARD_SCHEMA_VERSION, type BoardState } from './types';

export const demoBoardState = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Продумать структуру компонентов',
      description: 'Разделить интерфейс доски на компоненты Board, BoardColumn и TaskCard.',
      priority: 'high',
      tags: ['React', 'Architecture'],
      createdAt: '2026-07-20T09:00:00.000Z',
      updatedAt: '2026-07-21T10:30:00.000Z',
    },

    'task-2': {
      id: 'task-2',
      title: 'Настроить глобальные стили',
      description: 'Добавить CSS-переменные, базовый reset и стили страницы.',
      priority: 'medium',
      tags: ['CSS', 'SCSS'],
      createdAt: '2026-07-21T11:00:00.000Z',
      updatedAt: '2026-07-21T11:00:00.000Z',
    },

    'task-3': {
      id: 'task-3',
      title: 'Сверстать карточку задачи',
      description: 'Добавить название, описание, приоритет, теги и дату обновления.',
      priority: 'medium',
      tags: ['React', 'CSS Modules'],
      createdAt: '2026-07-22T08:45:00.000Z',
      updatedAt: '2026-07-23T14:15:00.000Z',
    },

    'task-4': {
      id: 'task-4',
      title: 'Сделать адаптивную доску',
      description: 'На небольших экранах колонки должны прокручиваться горизонтально.',
      priority: 'low',
      tags: ['Responsive', 'CSS Grid'],
      createdAt: '2026-07-23T12:00:00.000Z',
      updatedAt: '2026-07-24T16:20:00.000Z',
    },

    'task-5': {
      id: 'task-5',
      title: 'Настроить TypeScript',
      description: 'Включить строгие проверки и описать типы состояния Kanban-доски.',
      priority: 'high',
      tags: ['TypeScript'],
      createdAt: '2026-07-19T10:00:00.000Z',
      updatedAt: '2026-07-20T18:00:00.000Z',
    },
  },

  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      taskIds: ['task-4'],
    },

    todo: {
      id: 'todo',
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
    },

    'in-progress': {
      id: 'in-progress',
      title: 'In progress',
      taskIds: ['task-3'],
    },

    done: {
      id: 'done',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },

  columnOrder: ['backlog', 'todo', 'in-progress', 'done'],

  schemaVersion: BOARD_SCHEMA_VERSION,
} satisfies BoardState;

export function createDemoBoardState(): BoardState {
  return structuredClone(demoBoardState);
}
