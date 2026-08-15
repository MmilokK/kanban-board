import type { AppState } from './app-state';
import { APP_SCHEMA_VERSION } from './app-state';
import { DEFAULT_BOARD_ID, DEFAULT_BOARD_TITLE, DEFAULT_COLUMN_IDS } from './default-board';

const DEMO_CREATED_AT = '2026-01-01T00:00:00.000Z';

const demoAppState: AppState = {
  boards: {
    [DEFAULT_BOARD_ID]: {
      id: DEFAULT_BOARD_ID,
      title: DEFAULT_BOARD_TITLE,
      columnIds: [
        DEFAULT_COLUMN_IDS.backlog,
        DEFAULT_COLUMN_IDS.todo,
        DEFAULT_COLUMN_IDS.inProgress,
        DEFAULT_COLUMN_IDS.done,
        DEFAULT_COLUMN_IDS.archive,
      ],
      createdAt: DEMO_CREATED_AT,
      updatedAt: DEMO_CREATED_AT,
    },
  },

  boardOrder: [DEFAULT_BOARD_ID],

  activeBoardId: DEFAULT_BOARD_ID,

  columns: {
    [DEFAULT_COLUMN_IDS.backlog]: {
      id: DEFAULT_COLUMN_IDS.backlog,
      boardId: DEFAULT_BOARD_ID,
      title: 'Backlog',
      taskIds: ['task-4'],
      isCompleted: false,
      isArchive: false,
    },

    [DEFAULT_COLUMN_IDS.todo]: {
      id: DEFAULT_COLUMN_IDS.todo,
      boardId: DEFAULT_BOARD_ID,
      title: 'To do',
      taskIds: ['task-1', 'task-2'],
      isCompleted: false,
      isArchive: false,
    },

    [DEFAULT_COLUMN_IDS.inProgress]: {
      id: DEFAULT_COLUMN_IDS.inProgress,
      boardId: DEFAULT_BOARD_ID,
      title: 'In progress',
      taskIds: ['task-3'],
      isCompleted: false,
      isArchive: false,
    },

    [DEFAULT_COLUMN_IDS.done]: {
      id: DEFAULT_COLUMN_IDS.done,
      boardId: DEFAULT_BOARD_ID,
      title: 'Done',
      taskIds: ['task-5'],
      isCompleted: true,
      isArchive: false,
    },

    [DEFAULT_COLUMN_IDS.archive]: {
      id: DEFAULT_COLUMN_IDS.archive,
      boardId: DEFAULT_BOARD_ID,
      title: 'Archive',
      taskIds: [],
      isCompleted: false,
      isArchive: true,
    },
  },

  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Продумать структуру компонентов',
      description: 'Разделить интерфейс доски на компоненты Board, BoardColumn и TaskCard.',
      priority: 'high',
      tags: ['React', 'Architecture'],
      subtasks: [],
      comments: [],
      history: [],
      dueDate: null,
      createdAt: '2026-07-20T09:00:00.000Z',
      updatedAt: '2026-07-21T10:30:00.000Z',
      archivedAt: null,
    },

    'task-2': {
      id: 'task-2',
      title: 'Настроить глобальные стили',
      description: 'Добавить CSS-переменные, базовый reset и стили страницы.',
      priority: 'medium',
      tags: ['CSS', 'SCSS'],
      subtasks: [],
      comments: [],
      history: [],
      dueDate: null,
      createdAt: '2026-07-21T11:00:00.000Z',
      updatedAt: '2026-07-21T11:00:00.000Z',
      archivedAt: null,
    },

    'task-3': {
      id: 'task-3',
      title: 'Сверстать карточку задачи',
      description: 'Добавить название, описание, приоритет, теги и дату обновления.',
      priority: 'medium',
      tags: ['React', 'CSS Modules'],
      subtasks: [],
      comments: [],
      history: [],
      dueDate: null,
      createdAt: '2026-07-22T08:45:00.000Z',
      updatedAt: '2026-07-23T14:15:00.000Z',
      archivedAt: null,
    },

    'task-4': {
      id: 'task-4',
      title: 'Сделать адаптивную доску',
      description: 'На небольших экранах колонки должны прокручиваться горизонтально.',
      priority: 'low',
      tags: ['Responsive', 'CSS Grid'],
      subtasks: [],
      comments: [],
      history: [],
      dueDate: null,
      createdAt: '2026-07-23T12:00:00.000Z',
      updatedAt: '2026-07-24T16:20:00.000Z',
      archivedAt: null,
    },

    'task-5': {
      id: 'task-5',
      title: 'Настроить TypeScript',
      description: 'Включить строгие проверки и описать типы состояния Kanban-доски.',
      priority: 'high',
      tags: ['TypeScript'],
      subtasks: [],
      comments: [],
      history: [],
      dueDate: null,
      createdAt: '2026-07-19T10:00:00.000Z',
      updatedAt: '2026-07-20T18:00:00.000Z',
      archivedAt: null,
    },
  },

  schemaVersion: APP_SCHEMA_VERSION,
};

export function createDemoAppState(): AppState {
  return structuredClone(demoAppState);
}
