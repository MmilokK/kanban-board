import { z } from 'zod';

import type { Task } from '../../../entities/task/model/types';

export function parseTaskTags(value: string): string[] {
  const tags = value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return Array.from(new Set(tags));
}

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Введите название задачи')
    .max(80, 'Название не должно быть длиннее 80 символов'),

  description: z.string().trim().max(500, 'Описание не должно быть длиннее 500 символов'),

  priority: z.enum(['low', 'medium', 'high']),

  tags: z
    .string()
    .trim()
    .max(120, 'Список тегов слишком длинный')
    .refine((value) => parseTaskTags(value).length <= 5, 'Можно добавить не больше пяти тегов')
    .refine(
      (value) => parseTaskTags(value).every((tag) => tag.length <= 20),
      'Каждый тег должен быть не длиннее 20 символов',
    ),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;

export function getTaskFormDefaultValues(task: Task | null): TaskFormValues {
  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    priority: task?.priority ?? 'medium',
    tags: task?.tags.join(', ') ?? '',
  };
}
