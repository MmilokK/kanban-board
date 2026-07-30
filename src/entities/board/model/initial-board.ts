import { BOARD_SCHEMA_VERSION, type BoardState } from './types';

export const initialBoardState = {
  tasks: {},

  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      taskIds: [],
    },

    todo: {
      id: 'todo',
      title: 'To do',
      taskIds: [],
    },

    'in-progress': {
      id: 'in-progress',
      title: 'In progress',
      taskIds: [],
    },

    done: {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },

  columnOrder: ['backlog', 'todo', 'in-progress', 'done'],

  schemaVersion: BOARD_SCHEMA_VERSION,
} satisfies BoardState;
