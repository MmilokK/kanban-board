import type { AppState } from './app-state';
import type { Board } from './types';
import type { Column } from '../../column/model/types';

export function selectActiveBoard(state: Pick<AppState, 'activeBoardId' | 'boards'>): Board | null {
  if (!state.activeBoardId) {
    return null;
  }

  return state.boards[state.activeBoardId] ?? null;
}

export function selectOrderedBoards(state: Pick<AppState, 'boards' | 'boardOrder'>): Board[] {
  return state.boardOrder
    .map((boardId) => state.boards[boardId])
    .filter((board): board is Board => board !== undefined);
}

export function selectActiveBoardColumns(
  state: Pick<AppState, 'activeBoardId' | 'boards' | 'columns'>,
): Column[] {
  const board = selectActiveBoard(state);

  if (!board) {
    return [];
  }

  return board.columnIds
    .map((columnId) => state.columns[columnId])
    .filter((column): column is Column => column !== undefined);
}
