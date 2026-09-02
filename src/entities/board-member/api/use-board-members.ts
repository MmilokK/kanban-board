import { useQuery } from '@tanstack/react-query';
import { boardMemberQueryKeys } from './board-member-query-keys';
import { queryBoardMembers } from './board-members-api';

export function useBoardMembers(boardId: string) {
  return useQuery({
    queryKey: boardMemberQueryKeys.list(boardId),
    queryFn: () => queryBoardMembers(boardId),
    enabled: boardId.length > 0,
  });
}
