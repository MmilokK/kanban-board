import { useMutation, useQueryClient } from '@tanstack/react-query';
import { boardMemberQueryKeys } from '../../../entities/board-member/api/board-member-query-keys';
import { deleteBoardMember } from '../../../entities/board-member/api/board-members-api';

export function useRemoveBoardMember(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteBoardMember(boardId, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardMemberQueryKeys.list(boardId),
      });
    },
  });
}
