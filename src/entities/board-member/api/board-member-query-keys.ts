export const boardMemberQueryKeys = {
  all: ['board-members'] as const,
  list: (boardId: string) => [...boardMemberQueryKeys.all, 'list', boardId] as const,
};
