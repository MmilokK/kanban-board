import type { FastifyInstance } from 'fastify';
import { AppError } from '../errors/app-error.js';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
        code: error.code,
        ...(error.details !== undefined ? { details: error.details } : {}),
      });
    }

    request.log.error({ err: error }, 'Unhandled request error');

    return reply.status(500).send({
      message: 'Внутренняя ошибка сервера',
      code: 'INTERNAL_SERVER_ERROR',
    });
  });
}
