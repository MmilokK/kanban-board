import type { ZodType } from 'zod';
import { AppError } from '../errors/app-error.js';

export function parseInput<T>(schema: ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new AppError('Некорректные данные', {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      details: result.error.flatten(),
    });
  }

  return result.data;
}
