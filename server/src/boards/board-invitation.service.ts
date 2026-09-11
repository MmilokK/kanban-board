import { randomBytes } from 'node:crypto';
import { BoardInvitationType, NotificationType } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import type {
  CreateEmailBoardInvitationInput,
  CreateLinkBoardInvitationInput,
} from './board-invitation.types.js';
import { requireBoardOwner } from './board-access.js';
import { createNotification } from '../notifications/notification.service.js';

const DEFAULT_INVITATION_EXPIRES_IN_DAYS = 7;

function createInvitationToken(): string {
  return randomBytes(32).toString('hex');
}

function createExpirationDate(days: number): Date {
  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + days);

  return expiresAt;
}

export async function createEmailBoardInvitation(
  currentUserId: string,
  boardId: string,
  input: CreateEmailBoardInvitationInput,
) {
  await requireBoardOwner(currentUserId, boardId);

  const email = input.email.trim().toLowerCase();

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    const existingMembership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: existingUser.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingMembership) {
      throw new AppError('Пользователь уже является участником доски', {
        statusCode: 409,
        code: 'BOARD_MEMBER_ALREADY_EXISTS',
      });
    }
  }

  const existingInvitation = await db.boardInvitation.findFirst({
    where: {
      boardId,
      type: BoardInvitationType.EMAIL,
      email,
      revokedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
    },
  });

  if (existingInvitation) {
    throw new AppError('Для этого email уже существует активное приглашение', {
      statusCode: 409,
      code: 'BOARD_INVITATION_ALREADY_EXISTS',
    });
  }

  const invitation = await db.boardInvitation.create({
    data: {
      boardId,
      invitedByUserId: currentUserId,
      type: BoardInvitationType.EMAIL,
      email,
      role: input.role,
      token: createInvitationToken(),
      expiresAt: createExpirationDate(DEFAULT_INVITATION_EXPIRES_IN_DAYS),
      maxUses: 1,
    },
  });

  if (existingUser) {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
      select: {
        title: true,
      },
    });

    if (board) {
      await createNotification({
        userId: existingUser.id,
        type: NotificationType.BOARD_INVITATION_RECEIVED,
        title: 'Новое приглашение',
        message: `Вас пригласили на доску «${board.title}»`,
        boardId,
      });
    }
  }

  if (invitation.role === 'OWNER') {
    throw new AppError('Некорректная роль приглашения', {
      statusCode: 500,
      code: 'INVALID_BOARD_INVITATION_ROLE',
    });
  }

  return {
    ...invitation,
    role: invitation.role,
  };
}

export async function createLinkBoardInvitation(
  currentUserId: string,
  boardId: string,
  input: CreateLinkBoardInvitationInput,
) {
  await requireBoardOwner(currentUserId, boardId);

  return db.boardInvitation.create({
    data: {
      boardId,
      invitedByUserId: currentUserId,
      type: BoardInvitationType.LINK,
      email: null,
      role: input.role,
      token: createInvitationToken(),
      expiresAt: createExpirationDate(input.expiresInDays),
      maxUses: input.maxUses ?? null,
    },
  });
}

export async function listBoardInvitations(currentUserId: string, boardId: string) {
  await requireBoardOwner(currentUserId, boardId);

  return db.boardInvitation.findMany({
    where: {
      boardId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function revokeBoardInvitation(
  currentUserId: string,
  boardId: string,
  invitationId: string,
) {
  await requireBoardOwner(currentUserId, boardId);

  const invitation = await db.boardInvitation.findFirst({
    where: {
      id: invitationId,
      boardId,
    },
  });

  if (!invitation) {
    throw new AppError('Приглашение не найдено', {
      statusCode: 404,
      code: 'BOARD_INVITATION_NOT_FOUND',
    });
  }

  if (invitation.revokedAt) {
    throw new AppError('Приглашение уже отозвано', {
      statusCode: 409,
      code: 'BOARD_INVITATION_ALREADY_REVOKED',
    });
  }

  return db.boardInvitation.update({
    where: {
      id: invitation.id,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function getBoardInvitationByToken(token: string) {
  const invitation = await db.boardInvitation.findUnique({
    where: {
      token,
    },
    include: {
      board: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!invitation) {
    throw new AppError('Приглашение не найдено', {
      statusCode: 404,
      code: 'BOARD_INVITATION_NOT_FOUND',
    });
  }

  const now = new Date();

  const isExpired = invitation.expiresAt <= now;
  const isRevoked = invitation.revokedAt !== null;
  const isExhausted = invitation.maxUses !== null && invitation.usedCount >= invitation.maxUses;

  return {
    invitation,
    isExpired,
    isRevoked,
    isExhausted,
  };
}
export async function getPublicBoardInvitationByToken(token: string) {
  const { invitation, isExpired, isRevoked, isExhausted } = await getBoardInvitationByToken(token);

  if (invitation.role === 'OWNER') {
    throw new AppError('Некорректная роль приглашения', {
      statusCode: 500,
      code: 'INVALID_BOARD_INVITATION_ROLE',
    });
  }

  return {
    boardTitle: invitation.board.title,
    role: invitation.role,
    type: invitation.type,
    expiresAt: invitation.expiresAt.toISOString(),
    isExpired,
    isRevoked,
    isExhausted,
    requiresAuthentication: true as const,
  };
}

export async function acceptBoardInvitation(currentUserId: string, token: string) {
  const invitation = await db.boardInvitation.findUnique({
    where: {
      token,
    },
    include: {
      board: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!invitation) {
    throw new AppError('Приглашение не найдено', {
      statusCode: 404,
      code: 'BOARD_INVITATION_NOT_FOUND',
    });
  }

  if (invitation.revokedAt) {
    throw new AppError('Приглашение было отозвано', {
      statusCode: 410,
      code: 'BOARD_INVITATION_REVOKED',
    });
  }

  if (invitation.expiresAt <= new Date()) {
    throw new AppError('Срок действия приглашения истёк', {
      statusCode: 410,
      code: 'BOARD_INVITATION_EXPIRED',
    });
  }

  if (invitation.maxUses !== null && invitation.usedCount >= invitation.maxUses) {
    throw new AppError('Лимит использований приглашения исчерпан', {
      statusCode: 410,
      code: 'BOARD_INVITATION_EXHAUSTED',
    });
  }

  const currentUser = await db.user.findUnique({
    where: {
      id: currentUserId,
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!currentUser) {
    throw new AppError('Пользователь не найден', {
      statusCode: 404,
      code: 'USER_NOT_FOUND',
    });
  }

  if (
    invitation.type === BoardInvitationType.EMAIL &&
    invitation.email !== currentUser.email.trim().toLowerCase()
  ) {
    throw new AppError('Приглашение предназначено другому пользователю', {
      statusCode: 403,
      code: 'BOARD_INVITATION_EMAIL_MISMATCH',
    });
  }

  const existingMembership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId: invitation.boardId,
        userId: currentUserId,
      },
    },
  });

  if (existingMembership) {
    throw new AppError('Пользователь уже является участником доски', {
      statusCode: 409,
      code: 'BOARD_MEMBER_ALREADY_EXISTS',
    });
  }

  const result = await db.$transaction(async (tx) => {
    const member = await tx.boardMember.create({
      data: {
        boardId: invitation.boardId,
        userId: currentUserId,
        role: invitation.role,
      },
    });

    await tx.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });

    const board = await tx.board.findUnique({
      where: {
        id: invitation.boardId,
      },
      select: {
        title: true,
      },
    });

    if (board) {
      await tx.notification.create({
        data: {
          userId: currentUserId,
          type: NotificationType.BOARD_ACCESS_GRANTED,
          title: 'Доступ к доске получен',
          message: `Вы получили доступ к доске «${board.title}»`,
          boardId: invitation.boardId,
        },
      });
    }

    return member;
  });

  return result;
}
