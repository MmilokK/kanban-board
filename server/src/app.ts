import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod';
import Fastify, { type FastifyInstance } from 'fastify';
import type { Env } from './config/env.js';
import { env as defaultEnv } from './config/env.js';
import { db } from './db/client.js';
import { registerErrorHandler } from './plugins/error-handler.js';
import { registerSwagger } from './plugins/swagger.js';
import { registerAuthRoutes } from './routes/auth.js';
import { registerBoardContentRoutes } from './routes/board-content.js';
import { boardInvitationRoutes } from './routes/board-invitations.js';
import { registerBoardMemberRoutes } from './routes/board-members.js';
import { registerBoardRoutes } from './routes/boards.js';
import { registerHealthRoutes } from './routes/health.js';
import { registerInvitationRoutes } from './routes/invitations.js';
import { registerRealtimeRoutes } from './routes/realtime.js';

export type BuildAppOptions = {
  env?: Env;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const currentEnv = options.env ?? defaultEnv;

  const app = Fastify({
    logger: currentEnv.NODE_ENV === 'test' ? false : { level: currentEnv.LOG_LEVEL },
    requestTimeout: 120_000,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(cookie);

  await app.register(cors, {
    origin: currentEnv.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  await app.register(websocket);

  app.addHook('onClose', async () => {
    await db.$disconnect();
  });

  registerErrorHandler(app);

  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send({
      message: 'Маршрут не найден',
      code: 'ROUTE_NOT_FOUND',
    });
  });

  await registerSwagger(app);

  await app.register(registerHealthRoutes, {
    prefix: '/api',
  });

  await app.register(registerAuthRoutes, {
    prefix: '/api/auth',
    env: currentEnv,
  });

  await app.register(registerBoardRoutes, {
    prefix: '/api/boards',
  });

  await app.register(registerBoardContentRoutes, {
    prefix: '/api/boards',
  });

  await app.register(registerBoardMemberRoutes, {
    prefix: '/api/boards',
  });

  await app.register(boardInvitationRoutes, {
    prefix: '/api/boards',
  });

  await app.register(registerInvitationRoutes, {
    prefix: '/api/invitations',
  });

  await app.register(registerRealtimeRoutes, {
    prefix: '/api/realtime',
  });

  return app;
}
