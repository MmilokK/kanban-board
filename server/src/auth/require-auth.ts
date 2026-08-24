import type { FastifyRequest } from 'fastify';
import { AppError } from '../errors/app-error.js';
import { SESSION_COOKIE_NAME } from './auth-config.js';
import { getUserBySessionToken } from './auth-service.js';
import type { AuthUser } from './auth-types.js';

export async function requireAuth(request: FastifyRequest): Promise<AuthUser> {
  const token = request.cookies[SESSION_COOKIE_NAME];

  if (!token) {
    throw new AppError('Требуется вход в аккаунт', {
      statusCode: 401,
      code: 'UNAUTHENTICATED',
    });
  }

  const user = await getUserBySessionToken(token);

  if (!user) {
    throw new AppError('Сессия недействительна', {
      statusCode: 401,
      code: 'UNAUTHENTICATED',
    });
  }

  return user;
}
