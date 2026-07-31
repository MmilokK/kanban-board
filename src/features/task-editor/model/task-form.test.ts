import { describe, expect, it } from 'vitest';

import { parseTaskTags, taskFormSchema } from './task-form';

describe('parseTaskTags', () => {
  it('разделяет теги по запятым', () => {
    const result = parseTaskTags('React, TypeScript, CSS');

    expect(result).toEqual(['React', 'TypeScript', 'CSS']);
  });

  it('удаляет пробелы, пустые значения и повторения', () => {
    const result = parseTaskTags(' React, , TypeScript, React, CSS ');

    expect(result).toEqual(['React', 'TypeScript', 'CSS']);
  });

  it('возвращает пустой массив для пустой строки', () => {
    expect(parseTaskTags('')).toEqual([]);
  });
});

describe('taskFormSchema', () => {
  it('принимает корректные данные формы', () => {
    const result = taskFormSchema.safeParse({
      title: 'Изучить тестирование',
      description: 'Добавить Vitest',
      priority: 'high',
      tags: 'React, Vitest',
    });

    expect(result.success).toBe(true);
  });

  it('отклоняет пустое название', () => {
    const result = taskFormSchema.safeParse({
      title: '   ',
      description: '',
      priority: 'medium',
      tags: '',
    });

    expect(result.success).toBe(false);
  });

  it('отклоняет больше пяти тегов', () => {
    const result = taskFormSchema.safeParse({
      title: 'Задача',
      description: '',
      priority: 'medium',
      tags: 'one, two, three, four, five, six',
    });

    expect(result.success).toBe(false);
  });
});
