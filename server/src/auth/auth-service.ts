import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { SESSION_DURATION_MS } from './auth-config.js';
import { hashPassword, verifyPassword } from './password.js';
import { createSessionToken, hashSessionToken } from './session-token.js';
import type { AuthUser } from './auth-types.js';

type CreatedSession = {
  token: string;
  expiresAt: Date;
};

function mapUser(user: { id: string; email: string; name: string | null }): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

async function createSession(userId: string): Promise<CreatedSession> {
  const token = createSessionToken();

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}

export async function registerUser(input: {
  email: string;
  password: string;
  name?: string | undefined;
}): Promise<{
  user: AuthUser;
  session: CreatedSession;
}> {
  const existingUser = await db.user.findUnique({
    where: {
      email: input.email,
    },
    select: {
      id: true,
    },
  });

  if (existingUser) {
    throw new AppError('Пользователь с таким email уже существует', {
      statusCode: 409,
      code: 'EMAIL_ALREADY_EXISTS',
    });
  }

  const passwordHash = await hashPassword(input.password);

  const user = await db.$transaction(async (transaction) => {
    return transaction.user.create({
      data: {
        email: input.email,
        ...(input.name !== undefined
          ? {
              name: input.name,
            }
          : {}),
        passwordCredential: {
          create: {
            passwordHash,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  });

  const session = await createSession(user.id);

  return {
    user: mapUser(user),
    session,
  };
}

export async function loginUser(input: { email: string; password: string }): Promise<{
  user: AuthUser;
  session: CreatedSession;
}> {
  const user = await db.user.findUnique({
    where: {
      email: input.email,
    },
    include: {
      passwordCredential: true,
    },
  });

  if (!user || !user.passwordCredential) {
    throw new AppError('Неверный email или пароль', {
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    });
  }

  const passwordIsValid = await verifyPassword(
    user.passwordCredential.passwordHash,
    input.password,
  );

  if (!passwordIsValid) {
    throw new AppError('Неверный email или пароль', {
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    });
  }

  const session = await createSession(user.id);

  return {
    user: mapUser(user),
    session,
  };
}

export async function getUserBySessionToken(token: string): Promise<AuthUser | null> {
  const tokenHash = hashSessionToken(token);

  const session = await db.session.findUnique({
    where: {
      tokenHash,
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

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date()) {
    await db.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return mapUser(session.user);
}

export async function deleteSessionByToken(token: string): Promise<void> {
  const tokenHash = hashSessionToken(token);

  await db.session.deleteMany({
    where: {
      tokenHash,
    },
  });
}
