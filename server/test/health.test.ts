import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { testEnv } from './test-env.js';

describe('Проверка состояния backend', () => {
  let app: FastifyInstance | undefined;

  afterEach(async () => {
    if (app) {
      await app.close();

      app = undefined;
    }
  });

  it('возвращает успешное состояние сервера', async () => {
    app = await buildApp({
      env: testEnv,
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      status: 'ok',
    });
  });

  it('возвращает ошибку для неизвестного маршрута', async () => {
    app = await buildApp({
      env: testEnv,
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/missing',
    });

    expect(response.statusCode).toBe(404);

    expect(response.json()).toEqual({
      message: 'Маршрут не найден',
      code: 'ROUTE_NOT_FOUND',
    });
  });

  it('разрешает запросы с frontend origin', async () => {
    app = await buildApp({
      env: testEnv,
    });

    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
      headers: {
        origin: 'http://localhost:5173',
      },
    });

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });
});
