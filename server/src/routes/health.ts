import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { z } from 'zod';
import { db } from '../db/client.js';

const healthResponseSchema = z.object({
  status: z.literal('ok'),
});

const readyResponseSchema = z.object({
  status: z.literal('ready'),
});

const unavailableResponseSchema = z.object({
  status: z.literal('unavailable'),
});

export async function registerHealthRoutes(app: FastifyInstance): Promise<void> {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Проверить состояние backend',
        response: {
          200: healthResponseSchema,
        },
      },
    },
    async () => ({ status: 'ok' }) as const,
  );

  typedApp.get(
    '/ready',
    {
      schema: {
        tags: ['Health'],
        summary: 'Проверить готовность backend',
        description: 'Проверяет, что backend запущен и соединение с PostgreSQL доступно.',
        response: {
          200: readyResponseSchema,
          503: unavailableResponseSchema,
        },
      },
    },
    async (_request, reply) => {
      try {
        await db.$queryRaw`
          SELECT 1
        `;

        return { status: 'ready' } as const;
      } catch {
        return reply.status(503).send({ status: 'unavailable' } as const);
      }
    },
  );
}
