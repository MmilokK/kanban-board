import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiBoard } from './board-api.types';
import { boardQueryKeys } from './board-query-keys';

type BoardMutationResponse = {
  board: ApiBoard;
};

export function useCloudBoardMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<BoardMutationResponse>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async ({ board }) => {
      queryClient.setQueryData(boardQueryKeys.detail(board.id), {
        board,
      });
      await queryClient.invalidateQueries({
        queryKey: boardQueryKeys.lists(),
      });
    },
  });
}
