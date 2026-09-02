import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { BoardRole } from '../../../entities/board-member/model/board-member';
import { boardMemberQueryKeys } from '../../../entities/board-member/api/board-member-query-keys';
import { updateBoardMemberRole } from '../../../entities/board-member/api/board-members-api';

type UpdateBoardMemberRoleVariables = {
  userId: string;
  role: Exclude<BoardRole, 'OWNER'>;
};

export function useUpdateBoardMemberRole(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: UpdateBoardMemberRoleVariables) =>
      updateBoardMemberRole(boardId, userId, role),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardMemberQueryKeys.list(boardId),
      });
    },
  });
}
