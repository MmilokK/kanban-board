import { apiRequest } from '../../../shared/api/api-client';
import type { BoardMember, BoardRole } from '../model/board-member';

type BoardMembersResponse = {
  members: BoardMember[];
};
type BoardMemberResponse = {
  member: BoardMember;
};

export async function queryBoardMembers(boardId: string): Promise<BoardMember[]> {
  const response = await apiRequest<BoardMembersResponse>(`/api/boards/${boardId}/members`);
  return response.members;
}

export async function updateBoardMemberRole(
  boardId: string,
  userId: string,
  role: Exclude<BoardRole, 'OWNER'>,
): Promise<BoardMember> {
  const response = await apiRequest<BoardMemberResponse>(
    `/api/boards/${boardId}/members/${userId}`,
    {
      method: 'PATCH',
      body: { role },
    },
  );
  return response.member;
}

export async function deleteBoardMember(boardId: string, userId: string): Promise<void> {
  await apiRequest<void>(`/api/boards/${boardId}/members/${userId}`, { method: 'DELETE' });
}
