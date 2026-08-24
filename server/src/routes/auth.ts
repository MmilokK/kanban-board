import type { FastifyInstance } from 'fastify';
import type { Env } from '../config/env.js';
import { clearSessionCookie, setSessionCookie } from '../auth/auth-cookie.js';
import { authResponseSchema, loginSchema, registerSchema } from '../auth/auth-schema.js';
import { deleteSessionByToken, loginUser, registerUser } from '../auth/auth-service.js';
import { SESSION_COOKIE_NAME } from '../auth/auth-config.js';
import { requireAuth } from '../auth/require-auth.js';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { apiErrorSchema } from '../schemas/api-response-schema.js';
import z from 'zod';

type AuthRouteOptions = {
  env: Env;
};

export async function registerAuthRoutes(
  app: FastifyInstance,
  options: AuthRouteOptions,
): Promise<void> {
  const { env } = options;
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Создание аккаунта',
        body: registerSchema,
        response: {
          201: authResponseSchema,
          400: apiErrorSchema,
          409: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { user, session } = await registerUser(request.body);
      setSessionCookie(reply, session.token, env);
      return reply.status(201).send({
        user,
      });
    },
  );

  typedApp.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Вход в аккаунт',
        body: loginSchema,
        response: {
          200: authResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { user, session } = await loginUser(request.body);
      setSessionCookie(reply, session.token, env);
      return {
        user,
      };
    },
  );

  typedApp.get(
    '/me',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Получить текущего пользователя',
        security: [{ sessionCookie: [] }],
        response: {
          200: authResponseSchema,
          401: apiErrorSchema,
        },
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      return {
        user,
      };
    },
  );

  typedApp.post(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Выйти из аккаунта',
        security: [{ sessionCookie: [] }],
        response: {
          204: z.undefined(),
        },
      },
    },
    async (request, reply) => {
      const token = request.cookies[SESSION_COOKIE_NAME];

      if (token) {
        await deleteSessionByToken(token);
      }

      clearSessionCookie(reply, env);

      return reply.status(204).send();
    },
  );
}
