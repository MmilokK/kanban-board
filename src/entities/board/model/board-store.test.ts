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

const CREATED_BOARD_ID = '00000000-0000-4000-8000-000000000100';

const CREATED_BOARD_COLUMN_IDS = {
  backlog: '00000000-0000-4000-8000-000000000101',
  todo: '00000000-0000-4000-8000-000000000102',
  inProgress: '00000000-0000-4000-8000-000000000103',
  done: '00000000-0000-4000-8000-000000000104',
};

const SECOND_BOARD_ID = '00000000-0000-4000-8000-000000000010';

const SECOND_BOARD_COLUMN_IDS = {
  backlog: '00000000-0000-4000-8000-000000000011',
  todo: '00000000-0000-4000-8000-000000000012',
  inProgress: '00000000-0000-4000-8000-000000000013',
  done: '00000000-0000-4000-8000-000000000014',
};

const SECOND_BOARD_TASK_ID = '00000000-0000-4000-8000-000000000015';

const THIRD_BOARD_ID = '00000000-0000-4000-8000-000000000020';

const THIRD_BOARD_COLUMN_IDS = {
  backlog: '00000000-0000-4000-8000-000000000021',
  todo: '00000000-0000-4000-8000-000000000022',
  inProgress: '00000000-0000-4000-8000-000000000023',
  done: '00000000-0000-4000-8000-000000000024',
};

const CREATED_COLUMN_ID = '00000000-0000-4000-8000-000000000200';

const COLUMN_UPDATED_AT = '2026-08-02T14:00:00.000Z';

const randomUUIDMock = vi.fn((): string => CREATED_TASK_ID);

const taskInput = {
  title: 'Новая задача',
  description: 'Описание новой задачи',
  priority: 'high' as const,
  tags: ['test', 'zustand'],
  dueDate: null,
};

type TestBoardIds = {
  boardId: BoardId;
  columnIds: {
    backlog: ColumnId;
    todo: ColumnId;
    inProgress: ColumnId;
    done: ColumnId;
  };
};

function mockCreateBoardIds({ boardId, columnIds }: TestBoardIds) {
  randomUUIDMock
    .mockReturnValueOnce(boardId)
    .mockReturnValueOnce(columnIds.backlog)
    .mockReturnValueOnce(columnIds.todo)
    .mockReturnValueOnce(columnIds.inProgress)
    .mockReturnValueOnce(columnIds.done);
}

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
    window.localStorage.clear();

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
      dueDate: null,
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
      dueDate: null,
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

    expect(useBoardStore.getState().createColumn).toEqual(expect.any(Function));

    expect(useBoardStore.getState().renameColumn).toEqual(expect.any(Function));

    expect(useBoardStore.getState().deleteColumn).toEqual(expect.any(Function));

    expect(useBoardStore.getState().moveColumn).toEqual(expect.any(Function));
  });

  it('сохраняет действия хранилища после сброса', () => {
    useBoardStore.getState().resetBoard();

    const state = useBoardStore.getState();

    expect(state.createBoard).toEqual(expect.any(Function));

    expect(state.setActiveBoard).toEqual(expect.any(Function));

    expect(state.renameBoard).toEqual(expect.any(Function));

    expect(state.deleteBoard).toEqual(expect.any(Function));

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

  it('создаёт новую доску и делает её активной', () => {
    mockCreateBoardIds({
      boardId: CREATED_BOARD_ID,
      columnIds: CREATED_BOARD_COLUMN_IDS,
    });

    const boardId = useBoardStore.getState().createBoard('Рабочая доска');

    expect(boardId).toBe(CREATED_BOARD_ID);

    const state = useBoardStore.getState();

    expect(state.activeBoardId).toBe(CREATED_BOARD_ID);

    expect(state.boardOrder).toEqual([DEFAULT_BOARD_ID, CREATED_BOARD_ID]);

    expect(state.boards[CREATED_BOARD_ID]).toMatchObject({
      id: CREATED_BOARD_ID,
      title: 'Рабочая доска',
      columnIds: [
        CREATED_BOARD_COLUMN_IDS.backlog,
        CREATED_BOARD_COLUMN_IDS.todo,
        CREATED_BOARD_COLUMN_IDS.inProgress,
        CREATED_BOARD_COLUMN_IDS.done,
      ],
    });

    expect(randomUUIDMock).toHaveBeenCalledTimes(5);
  });

  it('не создаёт доску с пустым названием', () => {
    const stateBefore = structuredClone(selectDataState());

    const result = useBoardStore.getState().createBoard('   ');

    expect(result).toBeNull();

    expect(selectDataState()).toEqual(stateBefore);

    expect(randomUUIDMock).not.toHaveBeenCalled();
  });

  it('переключает активную доску', () => {
    mockCreateBoardIds({
      boardId: SECOND_BOARD_ID,
      columnIds: SECOND_BOARD_COLUMN_IDS,
    });

    useBoardStore.getState().createBoard('Вторая доска');

    expect(useBoardStore.getState().activeBoardId).toBe(SECOND_BOARD_ID);

    useBoardStore.getState().setActiveBoard(DEFAULT_BOARD_ID);

    expect(useBoardStore.getState().activeBoardId).toBe(DEFAULT_BOARD_ID);
  });

  it('переименовывает доску', () => {
    useBoardStore.getState().renameBoard(DEFAULT_BOARD_ID, 'Личные задачи');

    expect(useBoardStore.getState().boards[DEFAULT_BOARD_ID]?.title).toBe('Личные задачи');
  });

  it('удаляет доску вместе с колонками и задачами', () => {
    mockCreateBoardIds({
      boardId: SECOND_BOARD_ID,
      columnIds: SECOND_BOARD_COLUMN_IDS,
    });

    const createdBoardId = useBoardStore.getState().createBoard('Рабочая доска');

    expect(createdBoardId).toBe(SECOND_BOARD_ID);

    randomUUIDMock.mockReturnValueOnce(SECOND_BOARD_TASK_ID);

    useBoardStore.getState().addTask(SECOND_BOARD_COLUMN_IDS.backlog, taskInput);

    const stateBeforeDeletion = useBoardStore.getState();

    expect(stateBeforeDeletion.boards[SECOND_BOARD_ID]).toBeDefined();

    expect(stateBeforeDeletion.tasks[SECOND_BOARD_TASK_ID]).toBeDefined();

    for (const columnId of Object.values(SECOND_BOARD_COLUMN_IDS)) {
      expect(stateBeforeDeletion.columns[columnId]).toBeDefined();
    }

    useBoardStore.getState().deleteBoard(SECOND_BOARD_ID);

    const stateAfterDeletion = useBoardStore.getState();

    expect(stateAfterDeletion.boards[SECOND_BOARD_ID]).toBeUndefined();

    expect(stateAfterDeletion.boardOrder).toEqual([DEFAULT_BOARD_ID]);

    for (const columnId of Object.values(SECOND_BOARD_COLUMN_IDS)) {
      expect(stateAfterDeletion.columns[columnId]).toBeUndefined();
    }

    expect(stateAfterDeletion.tasks[SECOND_BOARD_TASK_ID]).toBeUndefined();

    expect(stateAfterDeletion.boards[DEFAULT_BOARD_ID]).toBeDefined();

    expect(stateAfterDeletion.activeBoardId).toBe(DEFAULT_BOARD_ID);
  });

  it('после удаления активной доски выбирает следующую', () => {
    mockCreateBoardIds({
      boardId: SECOND_BOARD_ID,
      columnIds: SECOND_BOARD_COLUMN_IDS,
    });

    useBoardStore.getState().createBoard('Вторая доска');

    mockCreateBoardIds({
      boardId: THIRD_BOARD_ID,
      columnIds: THIRD_BOARD_COLUMN_IDS,
    });

    useBoardStore.getState().createBoard('Третья доска');

    expect(useBoardStore.getState().boardOrder).toEqual([
      DEFAULT_BOARD_ID,
      SECOND_BOARD_ID,
      THIRD_BOARD_ID,
    ]);

    useBoardStore.getState().setActiveBoard(SECOND_BOARD_ID);

    expect(useBoardStore.getState().activeBoardId).toBe(SECOND_BOARD_ID);

    useBoardStore.getState().deleteBoard(SECOND_BOARD_ID);

    const state = useBoardStore.getState();

    expect(state.boardOrder).toEqual([DEFAULT_BOARD_ID, THIRD_BOARD_ID]);

    expect(state.activeBoardId).toBe(THIRD_BOARD_ID);

    expect(state.boards[SECOND_BOARD_ID]).toBeUndefined();

    expect(state.boards[THIRD_BOARD_ID]).toBeDefined();
  });

  it('после удаления последней активной доски выбирает предыдущую', () => {
    mockCreateBoardIds({
      boardId: SECOND_BOARD_ID,
      columnIds: SECOND_BOARD_COLUMN_IDS,
    });

    useBoardStore.getState().createBoard('Вторая доска');

    expect(useBoardStore.getState().activeBoardId).toBe(SECOND_BOARD_ID);

    useBoardStore.getState().deleteBoard(SECOND_BOARD_ID);

    const state = useBoardStore.getState();

    expect(state.boardOrder).toEqual([DEFAULT_BOARD_ID]);

    expect(state.activeBoardId).toBe(DEFAULT_BOARD_ID);
  });

  it('после удаления последней доски устанавливает активную доску в null', () => {
    useBoardStore.getState().deleteBoard(DEFAULT_BOARD_ID);

    const state = useBoardStore.getState();

    expect(state.boardOrder).toEqual([]);

    expect(state.activeBoardId).toBeNull();

    expect(state.boards).toEqual({});
    expect(state.columns).toEqual({});
    expect(state.tasks).toEqual({});
  });

  it('создаёт колонку в указанной доске', () => {
    randomUUIDMock.mockReturnValueOnce(CREATED_COLUMN_ID);

    const columnId = useBoardStore.getState().createColumn(DEFAULT_BOARD_ID, 'Проверка');

    expect(columnId).toBe(CREATED_COLUMN_ID);

    const column = getColumn(CREATED_COLUMN_ID);

    expect(column).toEqual({
      id: CREATED_COLUMN_ID,
      boardId: DEFAULT_BOARD_ID,
      title: 'Проверка',
      taskIds: [],
      isCompleted: false,
    });

    expect(getBoard(DEFAULT_BOARD_ID).columnIds).toContain(CREATED_COLUMN_ID);
  });

  it('не создаёт колонку с пустым названием', () => {
    const stateBefore = structuredClone(selectDataState());

    const result = useBoardStore.getState().createColumn(DEFAULT_BOARD_ID, '   ');

    expect(result).toBeNull();

    expect(selectDataState()).toEqual(stateBefore);

    expect(randomUUIDMock).not.toHaveBeenCalled();
  });

  it('не создаёт колонку в несуществующей доске', () => {
    const stateBefore = structuredClone(selectDataState());

    const result = useBoardStore.getState().createColumn('missing-board', 'Новая колонка');

    expect(result).toBeNull();

    expect(selectDataState()).toEqual(stateBefore);

    expect(randomUUIDMock).not.toHaveBeenCalled();
  });

  it('переименовывает колонку', () => {
    vi.setSystemTime(new Date(COLUMN_UPDATED_AT));

    useBoardStore.getState().renameColumn(DEFAULT_COLUMN_IDS.backlog, '   Идеи   ');

    expect(getColumn(DEFAULT_COLUMN_IDS.backlog).title).toBe('Идеи');

    expect(getBoard(DEFAULT_BOARD_ID).updatedAt).toBe(COLUMN_UPDATED_AT);
  });

  it('удаляет колонку вместе с её задачами', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, taskInput);

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]).toBeDefined();

    useBoardStore.getState().deleteColumn(DEFAULT_COLUMN_IDS.backlog);

    const state = useBoardStore.getState();

    expect(state.columns[DEFAULT_COLUMN_IDS.backlog]).toBeUndefined();

    expect(state.tasks[CREATED_TASK_ID]).toBeUndefined();

    expect(state.boards[DEFAULT_BOARD_ID]?.columnIds).not.toContain(DEFAULT_COLUMN_IDS.backlog);
  });

  it('изменяет порядок колонок', () => {
    useBoardStore.getState().moveColumn(DEFAULT_COLUMN_IDS.done, 0);

    expect(getBoard(DEFAULT_BOARD_ID).columnIds).toEqual([
      DEFAULT_COLUMN_IDS.done,
      DEFAULT_COLUMN_IDS.backlog,
      DEFAULT_COLUMN_IDS.todo,
      DEFAULT_COLUMN_IDS.inProgress,
    ]);
  });

  it('ограничивает позицию колонки допустимым диапазоном', () => {
    useBoardStore.getState().moveColumn(DEFAULT_COLUMN_IDS.backlog, 100);

    expect(getBoard(DEFAULT_BOARD_ID).columnIds.at(-1)).toBe(DEFAULT_COLUMN_IDS.backlog);
  });

  it('создаёт задачу со сроком выполнения', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, {
      ...taskInput,
      dueDate: '2026-08-10',
    });

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]?.dueDate).toBe('2026-08-10');
  });

  it('изменяет срок выполнения задачи', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, taskInput);

    useBoardStore.getState().updateTask(CREATED_TASK_ID, {
      dueDate: '2026-08-15',
    });

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]?.dueDate).toBe('2026-08-15');
  });

  it('удаляет срок выполнения задачи', () => {
    useBoardStore.getState().addTask(DEFAULT_COLUMN_IDS.backlog, {
      ...taskInput,
      dueDate: '2026-08-15',
    });

    useBoardStore.getState().updateTask(CREATED_TASK_ID, {
      dueDate: null,
    });

    expect(useBoardStore.getState().tasks[CREATED_TASK_ID]?.dueDate).toBeNull();
  });
});
