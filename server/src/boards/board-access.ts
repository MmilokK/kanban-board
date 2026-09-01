import { BoardMemberRole } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';

export async function requireBoardMember(userId: string, boardId: string) {
  const membership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId,
        userId,
      },
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

export async function requireBoardEditor(userId: string, boardId: string) {
  const membership = await requireBoardMember(userId, boardId);

  if (membership.role === BoardMemberRole.VIEWER) {
    throw new AppError('Недостаточно прав для изменения доски', {
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  }

  return membership;
}

export async function requireBoardOwner(userId: string, boardId: string) {
  const membership = await requireBoardMember(userId, boardId);

  if (membership.role !== BoardMemberRole.OWNER) {
    throw new AppError('Недостаточно прав', {
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  }

  return membership;
}
