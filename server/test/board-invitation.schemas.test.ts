import { describe, expect, it } from 'vitest';

import {
  createEmailBoardInvitationBodySchema,
  createLinkBoardInvitationBodySchema,
} from '../src/boards/board-invitation.schemas.js';

describe('схемы приглашений на доску', () => {
  it('принимает корректное приглашение по email', () => {
    const result = createEmailBoardInvitationBodySchema.parse({
      email: 'user@example.com',
      role: 'EDITOR',
    });

    expect(result).toEqual({
      email: 'user@example.com',
      role: 'EDITOR',
    });
  });

  it('не разрешает роль OWNER для приглашения по email', () => {
    const result = createEmailBoardInvitationBodySchema.safeParse({
      email: 'user@example.com',
      role: 'OWNER',
    });

    expect(result.success).toBe(false);
  });

  it('не принимает некорректный email', () => {
    const result = createEmailBoardInvitationBodySchema.safeParse({
      email: 'not-an-email',
      role: 'VIEWER',
    });

    expect(result.success).toBe(false);
  });

  it('принимает корректное приглашение по ссылке', () => {
    const result = createLinkBoardInvitationBodySchema.parse({
      role: 'VIEWER',
      expiresInDays: 7,
      maxUses: 10,
    });

    expect(result).toEqual({
      role: 'VIEWER',
      expiresInDays: 7,
      maxUses: 10,
    });
  });

  it('подставляет срок действия ссылки по умолчанию', () => {
    const result = createLinkBoardInvitationBodySchema.parse({
      role: 'EDITOR',
    });

    expect(result).toEqual({
      role: 'EDITOR',
      expiresInDays: 7,
    });
  });

  it('не разрешает роль OWNER для приглашения по ссылке', () => {
    const result = createLinkBoardInvitationBodySchema.safeParse({
      role: 'OWNER',
      expiresInDays: 7,
    });

    expect(result.success).toBe(false);
  });

  it('не разрешает срок действия ссылки больше 30 дней', () => {
    const result = createLinkBoardInvitationBodySchema.safeParse({
      role: 'VIEWER',
      expiresInDays: 31,
    });

    expect(result.success).toBe(false);
  });

  it('не разрешает maxUses больше 100', () => {
    const result = createLinkBoardInvitationBodySchema.safeParse({
      role: 'VIEWER',
      expiresInDays: 7,
      maxUses: 101,
    });

    expect(result.success).toBe(false);
  });
});
