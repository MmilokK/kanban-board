import { describe, expect, it } from 'vitest';
import { createDeletedTaskSnapshot } from './deleted-task-snapshot';
import type { Task } from './types';

const column = {
  id: '123',
  boardId: '123',
  title: 'Проверка',
  taskIds: ['task-before', 'task', 'task-after'],
  isCompleted: false,
  isArchive: false,
};

const task = {
  id: 'task',
  title: 'Проверка',
  description: 'Проверка',
  priority: 'high',
  tags: [],
  subtasks: [],
  comments: [],
  history: [],
  dueDate: null,
  createdAt: '',
  updatedAt: '',
  archivedAt: null,
};

describe('Снимок удаляемой задачи', () => {
  it('создаёт снимок с позицией задачи', () => {
    const result = createDeletedTaskSnapshot(task as Task, column);

    expect(result).toEqual({
      task,
      columnId: column.id,
      index: 1,
    });
  });

  it('возвращает null если задачи нет в колонке', () => {
    expect(
      createDeletedTaskSnapshot(task as Task, {
        ...column,
        taskIds: [],
      }),
    ).toBeNull();
  });
});
