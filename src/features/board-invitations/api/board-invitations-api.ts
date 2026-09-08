import { apiRequest } from '../../../shared/api/api-client';

export type BoardInvitationRole = 'EDITOR' | 'VIEWER';
export type BoardInvitationType = 'EMAIL' | 'LINK';
export type BoardInvitation = {
  id: string;
  boardId: string;
  invitedByUserId: string;
  type: BoardInvitationType;
  email: string | null;
  role: BoardInvitationRole;
  token: string;
  expiresAt: string;
  maxUses: number | null;
  usedCount: number;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PublicBoardInvitation = {
  boardTitle: string;
  role: BoardInvitationRole;
  type: BoardInvitationType;
  expiresAt: string;
  isExpired: boolean;
  isRevoked: boolean;
  isExhausted: boolean;
  requiresAuthentication: true;
};

export type AcceptedBoardMember = {
  id: string;
  boardId: string;
  userId: string;
  role: BoardInvitationRole;
  createdAt: string;
  updatedAt: string;
};

export type CreateEmailBoardInvitationInput = {
  email: string;
  role: BoardInvitationRole;
};

export type CreateLinkBoardInvitationInput = {
  role: BoardInvitationRole;
  expiresInDays?: number;
  maxUses?: number | null;
};

export function createEmailBoardInvitation(
  boardId: string,
  input: CreateEmailBoardInvitationInput,
) {
  return apiRequest<{ invitation: BoardInvitation }>(`/boards/${boardId}/invitations/email`, {
    method: 'POST',
    body: input,
  });
}

export function createLinkBoardInvitation(boardId: string, input: CreateLinkBoardInvitationInput) {
  return apiRequest<{ invitation: BoardInvitation }>(`/boards/${boardId}/invitations/link`, {
    method: 'POST',
    body: input,
  });
}

export function getBoardInvitations(boardId: string) {
  return apiRequest<{ invitations: BoardInvitation[] }>(`/boards/${boardId}/invitations`);
}

export function revokeBoardInvitation(boardId: string, invitationId: string) {
  return apiRequest<void>(`/boards/${boardId}/invitations/${invitationId}`, {
    method: 'DELETE',
  });
}

export function getPublicBoardInvitation(token: string) {
  return apiRequest<{ invitation: PublicBoardInvitation }>(`/invitations/${token}`);
}

export function acceptBoardInvitation(token: string) {
  return apiRequest<{ member: AcceptedBoardMember }>(`/invitations/${token}/accept`, {
    method: 'POST',
  });
}
