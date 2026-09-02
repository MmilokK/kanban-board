import type { BoardMemberRole } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { requireBoardMember, requireBoardOwner } from './board-access.js';

type BoardMemberWithUser = {
  id: string;
  role: BoardMemberRole;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
};

function mapBoardMember(member: BoardMemberWithUser) {
  return {
    id: member.id,
    user: {
      id: member.user.id,
      email: member.user.email,
      name: member.user.name,
    },
    role: member.role,
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };
}

export async function getBoardMembers(currentUserId: string, boardId: string) {
  await requireBoardMember(currentUserId, boardId);

  const members = await db.boardMember.findMany({
    where: {
      boardId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
  });

  return members.map(mapBoardMember);
}

export async function updateBoardMemberRole(
  currentUserId: string,
  boardId: string,
  targetUserId: string,
  role: 'EDITOR' | 'VIEWER',
) {
  await requireBoardOwner(currentUserId, boardId);

  const targetMembership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId,
        userId: targetUserId,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!targetMembership) {
    throw new AppError('Участник доски не найден', {
      statusCode: 404,
      code: 'BOARD_MEMBER_NOT_FOUND',
    });
  }

  if (targetMembership.role === 'OWNER') {
    throw new AppError('Нельзя изменить роль владельца доски', {
      statusCode: 400,
      code: 'BOARD_OWNER_ROLE_CHANGE_FORBIDDEN',
    });
  }

  const updatedMember = await db.boardMember.update({
    where: {
      id: targetMembership.id,
    },
    data: {
      role,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return mapBoardMember(updatedMember);
}

export async function removeBoardMember(
  currentUserId: string,
  boardId: string,
  targetUserId: string,
): Promise<void> {
  await requireBoardOwner(currentUserId, boardId);

  const targetMembership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId,
        userId: targetUserId,
      },
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!targetMembership) {
    throw new AppError('Участник доски не найден', {
      statusCode: 404,
      code: 'BOARD_MEMBER_NOT_FOUND',
    });
  }

  if (targetMembership.role === 'OWNER') {
    throw new AppError('Нельзя удалить владельца доски из участников', {
      statusCode: 400,
      code: 'BOARD_OWNER_REMOVE_FORBIDDEN',
    });
  }

  await db.boardMember.delete({
    where: {
      id: targetMembership.id,
    },
  });
}
