import type { BoardId } from '../../../shared/model/entity-ids';

export const boardQueryKeys = {
  all: ['boards'] as const,

  lists: () => [...boardQueryKeys.all, 'list'] as const,

  detail: (boardId: BoardId) => [...boardQueryKeys.all, 'detail', boardId] as const,
};
