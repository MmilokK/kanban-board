import type { FastifyInstance } from 'fastify';
import type { Env } from '../config/env.js';
import { clearSessionCookie, setSessionCookie } from '../auth/auth-cookie.js';
import { loginSchema, registerSchema } from '../auth/auth-schema.js';
import {
  deleteSessionByToken,
  getUserBySessionToken,
  loginUser,
  registerUser,
} from '../auth/auth-service.js';
import { SESSION_COOKIE_NAME } from '../auth/auth-config.js';
import { parseInput } from '../validation/parse-input.js';

type AuthRouteOptions = {
  env: Env;
};

export async function registerAuthRoutes(
  app: FastifyInstance,
  options: AuthRouteOptions,
): Promise<void> {
  const { env } = options;

  app.post('/register', async (request, reply) => {
    const input = parseInput(registerSchema, request.body);

    const { user, session } = await registerUser(input);

    setSessionCookie(reply, session.token, env);

    return reply.status(201).send({ user });
  });

  app.post('/login', async (request, reply) => {
    const input = parseInput(loginSchema, request.body);

    const { user, session } = await loginUser(input);

    setSessionCookie(reply, session.token, env);

    return { user };
  });

  app.get('/me', async (request, reply) => {
    const token = request.cookies[SESSION_COOKIE_NAME];

    if (!token) {
      return reply.status(401).send({
        message: 'Требуется вход в аккаунт',
        code: 'UNAUTHENTICATED',
      });
    }

    const user = await getUserBySessionToken(token);

    if (!user) {
      clearSessionCookie(reply, env);

      return reply.status(401).send({
        message: 'Сессия недействительна',
        code: 'UNAUTHENTICATED',
      });
    }

    return { user };
  });

  app.post('/logout', async (request, reply) => {
    const token = request.cookies[SESSION_COOKIE_NAME];

    if (token) {
      await deleteSessionByToken(token);
    }

    clearSessionCookie(reply, env);

    return reply.status(204).send();
  });
}
