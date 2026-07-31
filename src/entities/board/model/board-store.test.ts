import { beforeEach, describe, expect, it } from 'vitest';

import { BOARD_STORAGE_KEY } from './board-storage';
import { createDemoBoardState } from './demo-board';
import { useBoardStore } from './board-store';
import { selectTaskIdsByColumn } from './task-order';
import type { BoardState } from './types';

describe('useBoardStore', () => {
  beforeEach(() => {
    window.localStorage.clear();

    /*
     * setState без replace сохраняет действия store
     * и заменяет только данные доски.
     */
    useBoardStore.setState(createDemoBoardState());
  });

  it('добавляет задачу в выбранную колонку', () => {
    const taskId = useBoardStore.getState().addTask(
      {
        title: 'Новая задача',
        description: 'Описание',
        priority: 'high',
        tags: ['Vitest'],
      },
      'todo',
    );

    const state = useBoardStore.getState();
    const task = state.tasks[taskId];

    expect(task).toBeDefined();

    expect(task).toMatchObject({
      id: taskId,
      title: 'Новая задача',
      description: 'Описание',
      priority: 'high',
      tags: ['Vitest'],
    });

    expect(state.columns.todo.taskIds).toContain(taskId);
  });

  it('редактирует задачу', () => {
    const taskId = useBoardStore.getState().addTask(
      {
        title: 'Старое название',
        description: '',
        priority: 'low',
        tags: [],
      },
      'backlog',
    );

    const createdTask = useBoardStore.getState().tasks[taskId];

    if (!createdTask) {
      throw new Error('Задача не была создана');
    }

    const createdAt = createdTask.createdAt;

    useBoardStore.getState().updateTask(taskId, {
      title: 'Новое название',
      priority: 'high',
    });

    const updatedTask = useBoardStore.getState().tasks[taskId];

    expect(updatedTask).toBeDefined();

    expect(updatedTask?.title).toBe('Новое название');

    expect(updatedTask?.priority).toBe('high');

    expect(updatedTask?.createdAt).toBe(createdAt);
  });

  it('удаляет задачу из tasks и колонки', () => {
    const taskId = useBoardStore.getState().addTask(
      {
        title: 'Удаляемая задача',
        description: '',
        priority: 'medium',
        tags: [],
      },
      'done',
    );

    useBoardStore.getState().deleteTask(taskId);

    const state = useBoardStore.getState();

    expect(state.tasks[taskId]).toBeUndefined();

    expect(state.columns.done.taskIds).not.toContain(taskId);
  });

  it('перемещает порядок задач между колонками', () => {
    const state = useBoardStore.getState();

    const sourceColumnId = state.columnOrder.find(
      (columnId) => state.columns[columnId].taskIds.length > 0,
    );

    if (!sourceColumnId) {
      throw new Error('Не найдена колонка с задачами');
    }

    const targetColumnId = state.columnOrder.find((columnId) => columnId !== sourceColumnId);

    if (!targetColumnId) {
      throw new Error('Не найдена целевая колонка');
    }

    const taskOrder = selectTaskIdsByColumn(state);

    const taskId = taskOrder[sourceColumnId][0];

    if (!taskId) {
      throw new Error('Не удалось получить задачу');
    }

    taskOrder[sourceColumnId] = taskOrder[sourceColumnId].filter(
      (currentTaskId) => currentTaskId !== taskId,
    );

    taskOrder[targetColumnId] = [...taskOrder[targetColumnId], taskId];

    useBoardStore.getState().replaceTaskOrder(taskOrder);

    const nextState = useBoardStore.getState();

    expect(nextState.columns[sourceColumnId].taskIds).not.toContain(taskId);

    expect(nextState.columns[targetColumnId].taskIds).toContain(taskId);
  });

  it('сохраняет данные в localStorage без действий', () => {
    const taskId = useBoardStore.getState().addTask(
      {
        title: 'Сохраняемая задача',
        description: '',
        priority: 'medium',
        tags: [],
      },
      'todo',
    );

    const rawValue = window.localStorage.getItem(BOARD_STORAGE_KEY);

    expect(rawValue).not.toBeNull();

    if (!rawValue) {
      throw new Error('Данные не сохранились');
    }

    const persisted = JSON.parse(rawValue) as {
      state: BoardState;
      version: number;
    };

    expect(persisted.state.tasks[taskId]).toBeDefined();

    expect('addTask' in persisted.state).toBe(false);

    expect('deleteTask' in persisted.state).toBe(false);
  });
});
