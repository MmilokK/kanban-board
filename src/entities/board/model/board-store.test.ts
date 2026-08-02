import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { BoardId, ColumnId, TaskId } from '../../../shared/model/entity-ids';

import { APP_SCHEMA_VERSION } from './app-state';
import { DEFAULT_BOARD_ID, DEFAULT_COLUMN_IDS } from './default-board';
import { useBoardStore } from './board-store';
import { createDemoAppState } from './demo-board';

const CREATED_AT = '2026-08-02T10:00:00.000Z';

const UPDATED_AT = '2026-08-02T11:00:00.000Z';

const DELETED_AT = '2026-08-02T12:00:00.000Z';

const REORDERED_AT = '2026-08-02T13:00:00.000Z';

const CREATED_TASK_ID = '00000000-0000-4000-8000-000000000001';

const FIRST_TASK_ID = '00000000-0000-4000-8000-000000000002';

const SECOND_TASK_ID = '00000000-0000-4000-8000-000000000003';

const randomUUIDMock = vi.fn((): string => CREATED_TASK_ID);

const taskInput = {
  title: 'Новая задача',
  description: 'Описание новой задачи',
  priority: 'high' as const,
  tags: ['test', 'zustand'],
};

function getBoard(boardId: BoardId) {
  const board = useBoardStore.getState().boards[boardId];

  if (!board) {
    throw new Error(`Доска "${boardId}" не найдена`);
  }

  return board;
}

function getColumn(columnId: ColumnId) {
  const column = useBoardStore.getState().columns[columnId];

  if (!column) {
    throw new Error(`Колонка "${columnId}" не найдена`);
  }

  return column;
}

function getTask(taskId: TaskId) {
  const task = useBoardStore.getState().tasks[taskId];

  if (!task) {
    throw new Error(`Задача "${taskId}" не найдена`);
  }

  return task;
}

function selectDataState() {
  const state = useBoardStore.getState();

  return {
    boards: state.boards,
    boardOrder: state.boardOrder,
    activeBoardId: state.activeBoardId,
    columns: state.columns,
    tasks: state.tasks,
    schemaVersion: state.schemaVersion,
  };
}

describe('Хранилище доски', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(CREATED_AT));

    randomUUIDMock.mockReset();
    randomUUIDMock.mockReturnValue(CREATED_TASK_ID);

    vi.stubGlobal('crypto', {
      randomUUID: randomUUIDMock,
    });

    window.localStorage.clear();

    useBoardStore.setState(createDemoAppState());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('создаёт задачу в указанной колонке', () => {
    const backlogBefore = getColumn(DEFAULT_COLUMN_IDS.backlog);

    const previousTaskIds = [...backlogBefore.taskIds];

    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, taskInput);

    const createdTask = getTask(CREATED_TASK_ID);

    const backlogAfter = getColumn(DEFAULT_COLUMN_IDS.backlog);

    expect(createdTask).toEqual({
      id: CREATED_TASK_ID,
      title: 'Новая задача',
      description: 'Описание новой задачи',
      priority: 'high',
      tags: ['test', 'zustand'],
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
    });

    expect(backlogAfter.taskIds).toEqual([...previousTaskIds, CREATED_TASK_ID]);

    expect(getBoard(DEFAULT_BOARD_ID).updatedAt).toBe(CREATED_AT);
  });

  it('редактирует существующую задачу', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, taskInput);

    vi.setSystemTime(new Date(UPDATED_AT));

    useBoardStore.getState().updateTask(CREATED_TASK_ID, {
      title: 'Обновлённая задача',
      description: 'Новое описание задачи',
    });

    const updatedTask = getTask(CREATED_TASK_ID);

    expect(updatedTask).toEqual({
      id: CREATED_TASK_ID,
      title: 'Обновлённая задача',
      description: 'Новое описание задачи',
      priority: 'high',
      tags: ['test', 'zustand'],
      createdAt: CREATED_AT,
      updatedAt: UPDATED_AT,
    });

    expect(getBoard(DEFAULT_BOARD_ID).updatedAt).toBe(UPDATED_AT);
  });

  it('сохраняет неизменённые поля при частичном редактировании', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.todo, taskInput);

    vi.setSystemTime(new Date(UPDATED_AT));

    useBoardStore.getState().updateTask(CREATED_TASK_ID, {
      priority: 'low',
    });

    const updatedTask = getTask(CREATED_TASK_ID);

    expect(updatedTask.title).toBe(taskInput.title);

    expect(updatedTask.description).toBe(taskInput.description);

    expect(updatedTask.tags).toEqual(taskInput.tags);

    expect(updatedTask.priority).toBe('low');

    expect(updatedTask.createdAt).toBe(CREATED_AT);

    expect(updatedTask.updatedAt).toBe(UPDATED_AT);
  });

  it('удаляет задачу из объекта задач и колонки', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.todo, taskInput);

    expect(getColumn(DEFAULT_COLUMN_IDS.todo).taskIds).toContain(CREATED_TASK_ID);

    vi.setSystemTime(new Date(DELETED_AT));

    useBoardStore.getState().deleteTask(CREATED_TASK_ID);

    const state = useBoardStore.getState();

    expect(state.tasks[CREATED_TASK_ID]).toBeUndefined();

    expect(getColumn(DEFAULT_COLUMN_IDS.todo).taskIds).not.toContain(CREATED_TASK_ID);

    expect(getBoard(DEFAULT_BOARD_ID).updatedAt).toBe(DELETED_AT);
  });

  it('изменяет порядок задач и переносит задачу между колонками', () => {
    randomUUIDMock.mockReturnValueOnce(FIRST_TASK_ID).mockReturnValueOnce(SECOND_TASK_ID);

    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, {
      ...taskInput,
      title: 'Первая задача',
    });

    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, {
      ...taskInput,
      title: 'Вторая задача',
    });

    const backlogBefore = getColumn(DEFAULT_COLUMN_IDS.backlog);

    const todoBefore = getColumn(DEFAULT_COLUMN_IDS.todo);

    const nextBacklogTaskIds = backlogBefore.taskIds.filter((taskId) => taskId !== FIRST_TASK_ID);

    const nextTodoTaskIds = [...todoBefore.taskIds, FIRST_TASK_ID];

    vi.setSystemTime(new Date(REORDERED_AT));

    useBoardStore.getState().replaceTaskOrder({
      [DEFAULT_COLUMN_IDS.backlog]: nextBacklogTaskIds,

      [DEFAULT_COLUMN_IDS.todo]: nextTodoTaskIds,
    });

    expect(getColumn(DEFAULT_COLUMN_IDS.backlog).taskIds).toEqual(nextBacklogTaskIds);

    expect(getColumn(DEFAULT_COLUMN_IDS.todo).taskIds).toEqual(nextTodoTaskIds);

    expect(getColumn(DEFAULT_COLUMN_IDS.backlog).taskIds).toContain(SECOND_TASK_ID);

    expect(getColumn(DEFAULT_COLUMN_IDS.backlog).taskIds).not.toContain(FIRST_TASK_ID);

    expect(getColumn(DEFAULT_COLUMN_IDS.todo).taskIds).toContain(FIRST_TASK_ID);

    expect(useBoardStore.getState().tasks[FIRST_TASK_ID]).toBeDefined();

    expect(useBoardStore.getState().tasks[SECOND_TASK_ID]).toBeDefined();

    expect(getBoard(DEFAULT_BOARD_ID).updatedAt).toBe(REORDERED_AT);
  });

  it('сбрасывает состояние до демонстрационных данных', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, taskInput);

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]).toBeDefined();

    useBoardStore.getState().resetBoard();

    const expectedState = createDemoAppState();

    expect(selectDataState()).toEqual(expectedState);

    expect(useBoardStore.getState().schemaVersion).toBe(APP_SCHEMA_VERSION);

    expect(useBoardStore.getState().activeBoardId).toBe(DEFAULT_BOARD_ID);

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]).toBeUndefined();
  });

  it('сохраняет действия хранилища после сброса', () => {
    useBoardStore.getState().resetBoard();

    const state = useBoardStore.getState();

    expect(state.addTask).toEqual(expect.any(Function));

    expect(state.updateTask).toEqual(expect.any(Function));

    expect(state.deleteTask).toEqual(expect.any(Function));

    expect(state.replaceTaskOrder).toEqual(expect.any(Function));

    expect(state.resetBoard).toEqual(expect.any(Function));
  });

  it('не создаёт задачу в несуществующей колонке', () => {
    const stateBefore = structuredClone(selectDataState());

    useBoardStore.getState().addTask('missing-column', taskInput);

    expect(selectDataState()).toEqual(stateBefore);

    expect(randomUUIDMock).not.toHaveBeenCalled();
  });

  it('не изменяет несуществующую задачу', () => {
    const stateBefore = structuredClone(selectDataState());

    useBoardStore.getState().updateTask('missing-task', {
      title: 'Новое название',
    });

    expect(selectDataState()).toEqual(stateBefore);
  });

  it('не удаляет данные при неизвестном идентификаторе задачи', () => {
    const stateBefore = structuredClone(selectDataState());

    useBoardStore.getState().deleteTask('missing-task');

    expect(selectDataState()).toEqual(stateBefore);
  });

  it('игнорирует изменение порядка для неизвестной колонки', () => {
    const stateBefore = structuredClone(selectDataState());

    useBoardStore.getState().replaceTaskOrder({
      'missing-column': [],
    });

    expect(selectDataState()).toEqual(stateBefore);
  });
});
