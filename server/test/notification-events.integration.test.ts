import { randomUUID } from 'node:crypto';

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';
import { BoardMemberRole } from '../src/generated/prisma/client.js';
import { db } from '../src/db/client.js';
import {
  acceptBoardInvitation,
  createEmailBoardInvitation,
} from '../src/boards/board-invitation.service.js';
import { removeBoardMember, updateBoardMemberRole } from '../src/boards/board-member-service.js';
import { deleteBoard } from '../src/boards/board-service.js';

const PASSWORD = 'Password123!';

let app: Awaited<ReturnType<typeof buildApp>>;

async function registerUser(email: string): Promise<{
  userId: string;
}> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/register',
    payload: {
      email,
      password: PASSWORD,
      name: email.split('@')[0],
    },
  });

  expect(response.statusCode).toBe(201);

  const body = response.json<{
    user: {
      id: string;
    };
  }>();

  return {
    userId: body.user.id,
  };
}

function createEmail(prefix: string): string {
  return `${prefix}-${randomUUID()}@example.com`;
}

async function createBoardWithOwner(ownerId: string, title = 'Тестовая доска') {
  return db.board.create({
    data: {
      title,
      members: {
        create: {
          userId: ownerId,
          role: BoardMemberRole.OWNER,
        },
      },
    },
  });
}

describe('События уведомлений', () => {
  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  beforeEach(async () => {
    await db.notification.deleteMany();
    await db.boardInvitation.deleteMany();
    await db.boardMember.deleteMany();
    await db.board.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('создаёт уведомление при email-приглашении зарегистрированного пользователя', async () => {
    const ownerEmail = createEmail('notification-owner');
    const invitedEmail = createEmail('notification-invited');

    const owner = await registerUser(ownerEmail);
    const invitedUser = await registerUser(invitedEmail);

    const board = await createBoardWithOwner(owner.userId, 'Рабочая доска');

    await createEmailBoardInvitation(owner.userId, board.id, {
      email: invitedEmail,
      role: BoardMemberRole.EDITOR,
    });

    const notification = await db.notification.findFirst({
      where: {
        userId: invitedUser.userId,
        type: 'BOARD_INVITATION_RECEIVED',
      },
    });

    expect(notification).not.toBeNull();

    expect(notification).toMatchObject({
      userId: invitedUser.userId,
      type: 'BOARD_INVITATION_RECEIVED',
      title: 'Новое приглашение',
      message: 'Вас пригласили на доску «Рабочая доска»',
      boardId: board.id,
      readAt: null,
    });
  });

  it('не создаёт in-app уведомление для email, который ещё не зарегистрирован', async () => {
    const owner = await registerUser(createEmail('notification-owner-unregistered'));

    const board = await createBoardWithOwner(owner.userId);

    await createEmailBoardInvitation(owner.userId, board.id, {
      email: createEmail('not-registered'),
      role: BoardMemberRole.VIEWER,
    });

    const notificationCount = await db.notification.count();

    expect(notificationCount).toBe(0);
  });

  it('создаёт уведомление после принятия приглашения и получения доступа', async () => {
    const owner = await registerUser(createEmail('notification-access-owner'));

    const invitedEmail = createEmail('notification-access-user');

    const invitedUser = await registerUser(invitedEmail);

    const board = await createBoardWithOwner(owner.userId, 'Доска проекта');

    const invitation = await createEmailBoardInvitation(owner.userId, board.id, {
      email: invitedEmail,
      role: BoardMemberRole.EDITOR,
    });

    await db.notification.deleteMany({
      where: {
        userId: invitedUser.userId,
      },
    });

    await acceptBoardInvitation(invitedUser.userId, invitation.token);

    const notification = await db.notification.findFirst({
      where: {
        userId: invitedUser.userId,
        type: 'BOARD_ACCESS_GRANTED',
      },
    });

    expect(notification).not.toBeNull();

    expect(notification).toMatchObject({
      userId: invitedUser.userId,
      type: 'BOARD_ACCESS_GRANTED',
      title: 'Доступ к доске получен',
      message: 'Вы получили доступ к доске «Доска проекта»',
      boardId: board.id,
      readAt: null,
    });
  });

  it('создаёт уведомление при изменении роли участника', async () => {
    const owner = await registerUser(createEmail('notification-role-owner'));

    const member = await registerUser(createEmail('notification-role-member'));

    const board = await createBoardWithOwner(owner.userId, 'Командная доска');

    await db.boardMember.create({
      data: {
        boardId: board.id,
        userId: member.userId,
        role: BoardMemberRole.EDITOR,
      },
    });

    await updateBoardMemberRole(owner.userId, board.id, member.userId, 'VIEWER');

    const notification = await db.notification.findFirst({
      where: {
        userId: member.userId,
        type: 'BOARD_ROLE_CHANGED',
      },
    });

    expect(notification).not.toBeNull();

    expect(notification).toMatchObject({
      userId: member.userId,
      type: 'BOARD_ROLE_CHANGED',
      title: 'Роль на доске изменена',
      message: 'Ваша роль на доске «Командная доска» изменена на «Наблюдатель»',
      boardId: board.id,
      readAt: null,
    });
  });

  it('не создаёт уведомление при повторной установке той же роли', async () => {
    const owner = await registerUser(createEmail('notification-same-role-owner'));

    const member = await registerUser(createEmail('notification-same-role-member'));

    const board = await createBoardWithOwner(owner.userId);

    await db.boardMember.create({
      data: {
        boardId: board.id,
        userId: member.userId,
        role: BoardMemberRole.EDITOR,
      },
    });

    await updateBoardMemberRole(owner.userId, board.id, member.userId, 'EDITOR');

    const notificationCount = await db.notification.count({
      where: {
        userId: member.userId,
        type: 'BOARD_ROLE_CHANGED',
      },
    });

    expect(notificationCount).toBe(0);
  });

  it('создаёт уведомление при удалении участника из доски', async () => {
    const owner = await registerUser(createEmail('notification-remove-owner'));

    const member = await registerUser(createEmail('notification-remove-member'));

    const board = await createBoardWithOwner(owner.userId, 'Закрытая доска');

    await db.boardMember.create({
      data: {
        boardId: board.id,
        userId: member.userId,
        role: BoardMemberRole.EDITOR,
      },
    });

    await removeBoardMember(owner.userId, board.id, member.userId);

    const notification = await db.notification.findFirst({
      where: {
        userId: member.userId,
        type: 'BOARD_ACCESS_REVOKED',
      },
    });

    expect(notification).not.toBeNull();

    expect(notification).toMatchObject({
      userId: member.userId,
      type: 'BOARD_ACCESS_REVOKED',
      title: 'Доступ к доске отозван',
      message: 'Вы больше не имеете доступа к доске «Закрытая доска»',
      boardId: board.id,
      readAt: null,
    });

    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId: board.id,
          userId: member.userId,
        },
      },
    });

    expect(membership).toBeNull();
  });

  it('создаёт уведомление участникам при удалении доски', async () => {
    const owner = await registerUser(createEmail('notification-delete-owner'));

    const firstMember = await registerUser(createEmail('notification-delete-first'));

    const secondMember = await registerUser(createEmail('notification-delete-second'));

    const board = await createBoardWithOwner(owner.userId, 'Удаляемая доска');

    await db.boardMember.createMany({
      data: [
        {
          boardId: board.id,
          userId: firstMember.userId,
          role: BoardMemberRole.EDITOR,
        },
        {
          boardId: board.id,
          userId: secondMember.userId,
          role: BoardMemberRole.VIEWER,
        },
      ],
    });

    await deleteBoard(owner.userId, board.id);

    const notifications = await db.notification.findMany({
      where: {
        type: 'BOARD_DELETED',
      },
      orderBy: {
        userId: 'asc',
      },
    });

    expect(notifications).toHaveLength(2);

    expect(notifications.map((notification) => notification.userId)).toEqual(
      expect.arrayContaining([firstMember.userId, secondMember.userId]),
    );

    for (const notification of notifications) {
      expect(notification).toMatchObject({
        type: 'BOARD_DELETED',
        title: 'Доска удалена',
        message: 'Доска «Удаляемая доска» была удалена',
        boardId: board.id,
        readAt: null,
      });
    }

    const ownerNotification = await db.notification.findFirst({
      where: {
        userId: owner.userId,
        type: 'BOARD_DELETED',
      },
    });

    expect(ownerNotification).toBeNull();

    const deletedBoard = await db.board.findUnique({
      where: {
        id: board.id,
      },
    });

    expect(deletedBoard).toBeNull();
  });
});
