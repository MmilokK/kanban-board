import type { Env } from '../src/config/env.js';

export const testEnv: Env = {
  NODE_ENV: 'test',
  HOST: '127.0.0.1',
  PORT: 3000,
  CORS_ORIGIN: 'http://localhost:5173',
  LOG_LEVEL: 'silent',
  DATABASE_URL: 'postgresql://kanban:kanban@localhost:5432/kanban_test?schema=public',
};
