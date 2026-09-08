import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';

const OWNER_EMAIL = 'board-invitations-owner@test.local';
const EDITOR_EMAIL = 'board-invitations-editor@test.local';
const VIEWER_EMAIL = 'board-invitations-viewer@test.local';
const INVITEE_EMAIL = 'board-invitations-invitee@test.local';
const OTHER_EMAIL = 'board-invitations-other@test.local';
const PASSWORD = 'Password123!';

let app: FastifyInstance;

function getSessionCookie(response: {
  headers: Record<string, string | string[] | number | undefined>;
}): string {
  const setCookie = response.headers['set-cookie'];
  if (!setCookie) {
    throw new Error('Session cookie не найден');
  }
  const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : String(setCookie);
  if (!cookieHeader) {
    throw new Error('Session cookie пуст');
  }
  return cookieHeader.split(';')[0]!;
}

async function cleanup(): Promise<void> {
  const users = await db.user.findMany({
    where: {
      email: {
        in: [OWNER_EMAIL, EDITOR_EMAIL, VIEWER_EMAIL, INVITEE_EMAIL, OTHER_EMAIL],
      },
    },
    select: {
      id: true,
    },
  });
  const userIds = users.map((user) => user.id);
  if (userIds.length === 0) {
    return;
  }
  const memberships = await db.boardMember.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    select: {
      boardId: true,
    },
  });
  const boardIds = [...new Set(memberships.map((membership) => membership.boardId))];
  if (boardIds.length > 0) {
    await db.board.deleteMany({
      where: {
        id: {
          in: boardIds,
        },
      },
    });
  }
  await db.session.deleteMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });
  await db.passwordCredential.deleteMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });
  await db.user.deleteMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}

async function registerUser(email: string): Promise<{
  userId: string;
  cookie: string;
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
    cookie: getSessionCookie(response),
  };
}

async function createBoard(cookie: string): Promise<string> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/boards',
    headers: { cookie },
    payload: { title: 'Доска приглашений' },
  });
  expect(response.statusCode).toBe(201);
  return response.json<{
    board: {
      id: string;
    };
  }>().board.id;
}

async function createEmailInvitation(
  boardId: string,
  cookie: string,
  email = INVITEE_EMAIL,
  role: 'EDITOR' | 'VIEWER' = 'EDITOR',
): Promise<{
  id: string;
  token: string;
}> {
  const response = await app.inject({
    method: 'POST',
    url: `/api/boards/${boardId}/invitations/email`,
    headers: { cookie },
    payload: {
      email,
      role,
    },
  });
  expect(response.statusCode).toBe(200);
  const body = response.json<{
    invitation: {
      id: string;
      token: string;
    };
  }>();
  return {
    id: body.invitation.id,
    token: body.invitation.token,
  };
}

async function createLinkInvitation(
  boardId: string,
  cookie: string,
  options?: {
    role?: 'EDITOR' | 'VIEWER';
    expiresInDays?: number;
    maxUses?: number | null;
  },
): Promise<{
  id: string;
  token: string;
}> {
  const payload: {
    role: 'EDITOR' | 'VIEWER';
    expiresInDays: number;
    maxUses?: number | null;
  } = {
    role: options?.role ?? 'VIEWER',
    expiresInDays: options?.expiresInDays ?? 7,
  };
  if (options && 'maxUses' in options) {
    payload.maxUses = options.maxUses;
  }
  const response = await app.inject({
    method: 'POST',
    url: `/api/boards/${boardId}/invitations/link`,
    headers: { cookie },
    payload,
  });
  expect(response.statusCode).toBe(200);
  const body = response.json<{
    invitation: {
      id: string;
      token: string;
    };
  }>();
  return {
    id: body.invitation.id,
    token: body.invitation.token,
  };
}

describe('Приглашения на cloud-доску', () => {
  beforeAll(async () => {
    await cleanup();
    app = await buildApp();
    await app.ready();
  });
  afterAll(async () => {
    await cleanup();
    await app.close();
  });

  it('позволяет владельцу создать приглашение по email', async () => {
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/email`,
      headers: { cookie: owner.cookie },
      payload: {
        email: INVITEE_EMAIL,
        role: 'EDITOR',
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        boardId,
        email: INVITEE_EMAIL,
        type: 'EMAIL',
        role: 'EDITOR',
        maxUses: 1,
        usedCount: 0,
        revokedAt: null,
      },
    });
    const invitation = await db.boardInvitation.findFirst({
      where: {
        boardId,
        email: INVITEE_EMAIL,
      },
    });
    expect(invitation).not.toBeNull();
    expect(invitation?.type).toBe('EMAIL');
    expect(invitation?.role).toBe('EDITOR');
    expect(invitation?.maxUses).toBe(1);
    expect(invitation?.usedCount).toBe(0);
    expect(invitation?.token).toBeTruthy();
    expect(invitation?.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it('позволяет владельцу создать приглашение по ссылке', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/link`,
      headers: { cookie: owner.cookie },
      payload: {
        role: 'VIEWER',
        expiresInDays: 5,
        maxUses: 3,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        boardId,
        email: null,
        type: 'LINK',
        role: 'VIEWER',
        maxUses: 3,
        usedCount: 0,
        revokedAt: null,
      },
    });
    const invitation = await db.boardInvitation.findFirst({
      where: {
        boardId,
        type: 'LINK',
      },
    });
    expect(invitation).not.toBeNull();
    expect(invitation?.email).toBeNull();
    expect(invitation?.role).toBe('VIEWER');
    expect(invitation?.maxUses).toBe(3);
    expect(invitation?.usedCount).toBe(0);
    expect(invitation?.token).toBeTruthy();
    expect(invitation?.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it('создаёт приглашение по ссылке без ограничения количества использований', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/link`,
      headers: { cookie: owner.cookie },
      payload: {
        role: 'VIEWER',
        expiresInDays: 7,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        boardId,
        type: 'LINK',
        role: 'VIEWER',
        maxUses: null,
        usedCount: 0,
      },
    });
  });

  it('не позволяет редактору создавать приглашения', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: editor.userId,
        role: 'EDITOR',
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/link`,
      headers: { cookie: editor.cookie },
      payload: {
        role: 'VIEWER',
        expiresInDays: 7,
      },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ code: 'BOARD_OWNER_REQUIRED' });
    expect(
      await db.boardInvitation.count({
        where: { boardId },
      }),
    ).toBe(0);
  });

  it('не позволяет наблюдателю создавать приглашения', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const viewer = await registerUser(VIEWER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: viewer.userId,
        role: 'VIEWER',
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/email`,
      headers: { cookie: viewer.cookie },
      payload: {
        email: INVITEE_EMAIL,
        role: 'EDITOR',
      },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ code: 'BOARD_OWNER_REQUIRED' });
  });

  it('не позволяет постороннему пользователю создавать приглашения', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const other = await registerUser(OTHER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/link`,
      headers: { cookie: other.cookie },
      payload: {
        role: 'VIEWER',
        expiresInDays: 7,
      },
    });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ code: 'BOARD_NOT_FOUND' });
  });

  it('не создаёт email-приглашение для существующего участника', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: editor.userId,
        role: 'EDITOR',
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/email`,
      headers: { cookie: owner.cookie },
      payload: {
        email: EDITOR_EMAIL,
        role: 'VIEWER',
      },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json()).toMatchObject({ code: 'BOARD_MEMBER_ALREADY_EXISTS' });
  });

  it('не создаёт второе активное приглашение для того же email', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await createEmailInvitation(boardId, owner.cookie, INVITEE_EMAIL, 'EDITOR');
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${boardId}/invitations/email`,
      headers: { cookie: owner.cookie },
      payload: {
        email: INVITEE_EMAIL,
        role: 'VIEWER',
      },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_ALREADY_EXISTS' });
    expect(
      await db.boardInvitation.count({
        where: {
          boardId,
          email: INVITEE_EMAIL,
        },
      }),
    ).toBe(1);
  });

  it('возвращает список приглашений владельцу доски', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await createEmailInvitation(boardId, owner.cookie, INVITEE_EMAIL, 'EDITOR');
    await createLinkInvitation(boardId, owner.cookie, {
      role: 'VIEWER',
      maxUses: 5,
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/boards/${boardId}/invitations`,
      headers: { cookie: owner.cookie },
    });
    expect(response.statusCode).toBe(200);
    const body = response.json<{
      invitations: Array<{
        boardId: string;
        type: string;
        role: string;
      }>;
    }>();
    expect(body.invitations).toHaveLength(2);
    expect(body.invitations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          boardId,
          type: 'EMAIL',
          role: 'EDITOR',
        }),
        expect.objectContaining({
          boardId,
          type: 'LINK',
          role: 'VIEWER',
        }),
      ]),
    );
  });

  it('не позволяет редактору получить список приглашений', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const editor = await registerUser(EDITOR_EMAIL);
    const boardId = await createBoard(owner.cookie);
    await db.boardMember.create({
      data: {
        boardId,
        userId: editor.userId,
        role: 'EDITOR',
      },
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/boards/${boardId}/invitations`,
      headers: { cookie: editor.cookie },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      code: 'BOARD_OWNER_REQUIRED',
    });
  });

  it('позволяет владельцу отозвать приглашение', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/invitations/${invitation.id}`,
      headers: { cookie: owner.cookie },
    });
    expect(response.statusCode).toBe(204);
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.revokedAt).not.toBeNull();
  });

  it('не позволяет повторно отозвать приглашение', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    const firstResponse = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/invitations/${invitation.id}`,
      headers: { cookie: owner.cookie },
    });
    expect(firstResponse.statusCode).toBe(204);
    const secondResponse = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${boardId}/invitations/${invitation.id}`,
      headers: { cookie: owner.cookie },
    });
    expect(secondResponse.statusCode).toBe(409);
    expect(secondResponse.json()).toMatchObject({ code: 'BOARD_INVITATION_ALREADY_REVOKED' });
  });

  it('возвращает публичную информацию о приглашении без авторизации', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, {
      role: 'VIEWER',
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/invitations/${invitation.token}`,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        boardTitle: 'Доска приглашений',
        role: 'VIEWER',
        type: 'LINK',
        isExpired: false,
        isRevoked: false,
        isExhausted: false,
        requiresAuthentication: true,
      },
    });
  });

  it('не раскрывает приватные данные в публичной информации о приглашении', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createEmailInvitation(boardId, owner.cookie, INVITEE_EMAIL, 'EDITOR');
    const response = await app.inject({
      method: 'GET',
      url: `/api/invitations/${invitation.token}`,
    });
    expect(response.statusCode).toBe(200);
    const body = response.json<{ invitation: Record<string, unknown> }>();
    expect(body.invitation).not.toHaveProperty('email');
    expect(body.invitation).not.toHaveProperty('token');
    expect(body.invitation).not.toHaveProperty('invitedByUserId');
    expect(body.invitation).not.toHaveProperty('boardId');
  });

  it('возвращает 404 для неизвестного токена приглашения', async () => {
    await cleanup();
    const response = await app.inject({
      method: 'GET',
      url: '/api/invitations/unknown-invitation-token',
    });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_NOT_FOUND' });
  });

  it('позволяет зарегистрированному пользователю принять приглашение по ссылке', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const invitee = await registerUser(INVITEE_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, {
      role: 'VIEWER',
      maxUses: 3,
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      member: {
        boardId,
        userId: invitee.userId,
        role: 'VIEWER',
      },
    });
    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: invitee.userId,
        },
      },
    });
    expect(membership).not.toBeNull();
    expect(membership?.role).toBe('VIEWER');
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.usedCount).toBe(1);
  });

  it('позволяет пользователю принять email-приглашение для своего email', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createEmailInvitation(boardId, owner.cookie, INVITEE_EMAIL, 'EDITOR');
    const invitee = await registerUser(INVITEE_EMAIL);
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      member: {
        boardId,
        userId: invitee.userId,
        role: 'EDITOR',
      },
    });
    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: invitee.userId,
        },
      },
    });
    expect(membership?.role).toBe('EDITOR');
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.usedCount).toBe(1);
  });

  it('не позволяет принять email-приглашение для другого email', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const other = await registerUser(OTHER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createEmailInvitation(boardId, owner.cookie, INVITEE_EMAIL, 'VIEWER');
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: other.cookie },
    });
    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_EMAIL_MISMATCH' });
    const membership = await db.boardMember.findUnique({
      where: {
        boardId_userId: {
          boardId,
          userId: other.userId,
        },
      },
    });
    expect(membership).toBeNull();
  });

  it('требует авторизацию для принятия приглашения', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
    });
    expect(response.statusCode).toBe(401);
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.usedCount).toBe(0);
  });

  it('не позволяет принять отозванное приглашение', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const invitee = await registerUser(INVITEE_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(410);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_REVOKED' });
  });

  it('не позволяет принять просроченное приглашение', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const invitee = await registerUser(INVITEE_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        expiresAt: new Date(Date.now() - 60_000),
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(410);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_EXPIRED' });
  });

  it('не позволяет принять приглашение с исчерпанным лимитом использований', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const invitee = await registerUser(INVITEE_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, {
      maxUses: 1,
    });
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        usedCount: 1,
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(410);
    expect(response.json()).toMatchObject({ code: 'BOARD_INVITATION_EXHAUSTED' });
  });

  it('не создаёт повторное участие в доске', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const invitee = await registerUser(INVITEE_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, { role: 'EDITOR' });
    await db.boardMember.create({
      data: {
        boardId,
        userId: invitee.userId,
        role: 'VIEWER',
      },
    });
    const response = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: invitee.cookie },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json()).toMatchObject({ code: 'BOARD_MEMBER_ALREADY_EXISTS' });
    const membershipsCount = await db.boardMember.count({
      where: {
        boardId,
        userId: invitee.userId,
      },
    });
    expect(membershipsCount).toBe(1);
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.usedCount).toBe(0);
  });

  it('увеличивает счётчик использований ссылки после каждого принятия', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const firstInvitee = await registerUser(INVITEE_EMAIL);
    const secondInvitee = await registerUser(OTHER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, {
      role: 'VIEWER',
      maxUses: 2,
    });
    const firstResponse = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: firstInvitee.cookie },
    });
    expect(firstResponse.statusCode).toBe(200);
    const secondResponse = await app.inject({
      method: 'POST',
      url: `/api/invitations/${invitation.token}/accept`,
      headers: { cookie: secondInvitee.cookie },
    });
    expect(secondResponse.statusCode).toBe(200);
    const storedInvitation = await db.boardInvitation.findUnique({
      where: {
        id: invitation.id,
      },
    });
    expect(storedInvitation?.usedCount).toBe(2);
  });

  it('публично сообщает об истёкшем приглашении', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        expiresAt: new Date(Date.now() - 60_000),
      },
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/invitations/${invitation.token}`,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        isExpired: true,
        isRevoked: false,
        isExhausted: false,
      },
    });
  });

  it('публично сообщает об отозванном приглашении', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie);
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/invitations/${invitation.token}`,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        isExpired: false,
        isRevoked: true,
        isExhausted: false,
      },
    });
  });

  it('публично сообщает об исчерпанном лимите приглашения', async () => {
    await cleanup();
    const owner = await registerUser(OWNER_EMAIL);
    const boardId = await createBoard(owner.cookie);
    const invitation = await createLinkInvitation(boardId, owner.cookie, {
      maxUses: 1,
    });
    await db.boardInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        usedCount: 1,
      },
    });
    const response = await app.inject({
      method: 'GET',
      url: `/api/invitations/${invitation.token}`,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      invitation: {
        isExpired: false,
        isRevoked: false,
        isExhausted: true,
      },
    });
  });
});
