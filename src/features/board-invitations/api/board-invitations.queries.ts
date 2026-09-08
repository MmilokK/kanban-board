import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  acceptBoardInvitation,
  createEmailBoardInvitation,
  createLinkBoardInvitation,
  getBoardInvitations,
  getPublicBoardInvitation,
  revokeBoardInvitation,
  type CreateEmailBoardInvitationInput,
  type CreateLinkBoardInvitationInput,
} from './board-invitations-api';

export const boardInvitationQueryKeys = {
  all: ['board-invitations'] as const,
  board: (boardId: string) => [...boardInvitationQueryKeys.all, 'board', boardId] as const,
  public: (token: string) => [...boardInvitationQueryKeys.all, 'public', token] as const,
};

export function useBoardInvitationsQuery(
  boardId: string,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: boardInvitationQueryKeys.board(boardId),
    queryFn: () => getBoardInvitations(boardId),
    enabled: (options?.enabled ?? true) && Boolean(boardId),
  });
}

export function usePublicBoardInvitationQuery(
  token: string,
  options?: {
    enabled?: boolean;
  },
) {
  return useQuery({
    queryKey: boardInvitationQueryKeys.public(token),
    queryFn: () => getPublicBoardInvitation(token),
    enabled: (options?.enabled ?? true) && Boolean(token),
    retry: false,
  });
}

export function useCreateEmailBoardInvitationMutation(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEmailBoardInvitationInput) =>
      createEmailBoardInvitation(boardId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardInvitationQueryKeys.board(boardId),
      });
    },
  });
}

export function useCreateLinkBoardInvitationMutation(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLinkBoardInvitationInput) =>
      createLinkBoardInvitation(boardId, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardInvitationQueryKeys.board(boardId),
      });
    },
  });
}

export function useRevokeBoardInvitationMutation(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId: string) => revokeBoardInvitation(boardId, invitationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardInvitationQueryKeys.board(boardId),
      });
    },
  });
}

export function useAcceptBoardInvitationMutation(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => acceptBoardInvitation(token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: boardInvitationQueryKeys.public(token),
      });
    },
  });
}
