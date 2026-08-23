import type { FastifyReply } from 'fastify';
import type { Env } from '../config/env.js';
import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from './auth-config.js';

export function setSessionCookie(reply: FastifyReply, token: string, env: Env): void {
  reply.setCookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export function clearSessionCookie(reply: FastifyReply, env: Env): void {
  reply.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}
