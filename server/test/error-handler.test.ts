import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { AppError } from '../src/errors/app-error.js';
import { testEnv } from './test-env.js';

describe('Обработка ошибок backend', () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    if (app) {
      await app.close();

      app = undefined;
    }
  });

  it('возвращает типизированную прикладную ошибку', async () => {
    app = await buildApp({
      env: testEnv,
    });

    app.get('/test-error', async () => {
      throw new AppError('Тестовый ресурс не найден', {
        statusCode: 404,
        code: 'TEST_NOT_FOUND',
      });
    });

    const response = await app.inject({
      method: 'GET',
      url: '/test-error',
    });

    expect(response.statusCode).toBe(404);

    expect(response.json()).toEqual({
      message: 'Тестовый ресурс не найден',
      code: 'TEST_NOT_FOUND',
    });
  });

  it('не раскрывает внутреннюю ошибку клиенту', async () => {
    app = await buildApp({
      env: testEnv,
    });

    app.get('/unexpected-error', async () => {
      throw new Error('Database password is secret');
    });

    const response = await app.inject({
      method: 'GET',
      url: '/unexpected-error',
    });

    expect(response.statusCode).toBe(500);

    expect(response.json()).toEqual({
      message: 'Внутренняя ошибка сервера',
      code: 'INTERNAL_SERVER_ERROR',
    });

    expect(response.body).not.toContain('Database password is secret');
  });
});
