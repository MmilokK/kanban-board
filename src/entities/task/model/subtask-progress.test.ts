import { describe, expect, it } from 'vitest';

import type { Subtask } from './types';
import { getSubtaskProgress } from './subtask-progress';

function createSubtask(id: string, isCompleted: boolean): Subtask {
  return {
    id,
    title: `Подзадача ${id}`,
    description: '',
    isCompleted,
  };
}

describe('getSubtaskProgress', () => {
  it('возвращает пустой прогресс для задачи без подзадач', () => {
    expect(getSubtaskProgress([])).toEqual({
      completed: 0,
      total: 0,
      percentage: 0,
      isCompleted: false,
    });
  });

  it('считает количество выполненных подзадач', () => {
    const subtasks = [
      createSubtask('1', true),
      createSubtask('2', false),
      createSubtask('3', true),
      createSubtask('4', false),
    ];

    expect(getSubtaskProgress(subtasks)).toEqual({
      completed: 2,
      total: 4,
      percentage: 50,
      isCompleted: false,
    });
  });

  it('округляет процент выполнения', () => {
    const subtasks = [
      createSubtask('1', true),
      createSubtask('2', false),
      createSubtask('3', false),
    ];

    expect(getSubtaskProgress(subtasks)).toEqual({
      completed: 1,
      total: 3,
      percentage: 33,
      isCompleted: false,
    });
  });

  it('определяет полностью выполненный список подзадач', () => {
    const subtasks = [createSubtask('1', true), createSubtask('2', true), createSubtask('3', true)];

    expect(getSubtaskProgress(subtasks)).toEqual({
      completed: 3,
      total: 3,
      percentage: 100,
      isCompleted: true,
    });
  });

  it('не считает пустой список выполненным', () => {
    expect(getSubtaskProgress([]).isCompleted).toBe(false);
  });
});
