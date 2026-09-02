import { $Enums, BoardMemberRole } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';

export type BoardMembership = {
  boardId: string;
  userId: string;
  role: $Enums.BoardMemberRole;
};

export async function requireBoardMember(
  userId: string,
  boardId: string,
): Promise<BoardMembership> {
  const membership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId,
        userId,
      },
    },

    select: {
      boardId: true,
      userId: true,
      role: true,
    },
  });

  if (!membership) {
    throw new AppError('Доска не найдена', {
      statusCode: 404,
      code: 'BOARD_NOT_FOUND',
    });
  }

  return membership;
}

export async function requireBoardEditor(
  userId: string,
  boardId: string,
): Promise<BoardMembership> {
  const membership = await requireBoardMember(userId, boardId);

  if (membership.role !== BoardMemberRole.OWNER && membership.role !== BoardMemberRole.EDITOR) {
    throw new AppError('Недостаточно прав для изменения доски', {
      statusCode: 403,
      code: 'BOARD_EDIT_FORBIDDEN',
    });
  }

  return membership;
}

export async function requireBoardOwner(userId: string, boardId: string): Promise<BoardMembership> {
  const membership = await requireBoardMember(userId, boardId);

  if (membership.role !== BoardMemberRole.OWNER) {
    throw new AppError('Операция доступна только владельцу доски', {
      statusCode: 403,
      code: 'BOARD_OWNER_REQUIRED',
    });
  }

  return membership;
}
