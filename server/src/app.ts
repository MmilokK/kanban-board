import cors from '@fastify/cors';
import Fastify, { type FastifyInstance } from 'fastify';
import type { Env } from './config/env.js';
import { env as defaultEnv } from './config/env.js';
import { registerErrorHandler } from './plugins/error-handler.js';
import { registerHealthRoutes } from './routes/health.js';
import { db } from './db/client.js';
import cookie from '@fastify/cookie';
import { registerAuthRoutes } from './routes/auth.js';

export type BuildAppOptions = {
  env?: Env;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const currentEnv = options.env ?? defaultEnv;

  const app = Fastify({
    logger: currentEnv.NODE_ENV === 'test' ? false : { level: currentEnv.LOG_LEVEL },
    requestTimeout: 120_000,
  });

  await app.register(cookie);

  await app.register(cors, {
    origin: currentEnv.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

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

  await app.register(registerHealthRoutes, {
    prefix: '/api',
  });

  await app.register(registerAuthRoutes, {
    prefix: '/api/auth',
    env: currentEnv,
  });

  return app;
}
