import { z } from 'zod';

export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string(),
  details: z.unknown().optional(),
});
