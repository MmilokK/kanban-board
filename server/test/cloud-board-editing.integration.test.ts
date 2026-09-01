import type { FastifyInstance, LightMyRequestResponse } from 'fastify';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';
import { db } from '../src/db/client.js';

type AuthenticatedUser = {
  id: string;
  email: string;
  cookie: string;
};

type BoardResponse = {
  board: {
    id: string;
    title: string;
    role: 'OWNER' | 'EDITOR' | 'VIEWER';
    columns: Array<{
      id: string;
      title: string;
      position: number;
      isCompleted: boolean;
      isArchive: boolean;
    }>;
    tasks: Array<{
      id: string;
      columnId: string;
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
      tags: string[];
      dueDate: string | null;
      archivedAt: string | null;
      position: number;
      subtasks: Array<{
        id: string;
        title: string;
        description: string;
        isCompleted: boolean;
        position: number;
      }>;
      comments: Array<{
        id: string;
        text: string;
        createdAt: string;
        updatedAt: string;
      }>;
      history: Array<{
        id: string;
        type: string;
        payload: unknown;
        actor: {
          id: string;
          name: string | null;
        } | null;
        createdAt: string;
      }>;
      createdAt: string;
      updatedAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  };
};

const PASSWORD = 'Test-password-123';
let app: FastifyInstance;

function getCookie(response: LightMyRequestResponse): string {
  const setCookie = response.headers['set-cookie'];
  if (!setCookie) {
    throw new Error('Сервер не вернул cookie');
  }
  const cookieHeader = Array.isArray(setCookie) ? setCookie[0] : String(setCookie);
  if (!cookieHeader) {
    throw new Error('Cookie отсутствует');
  }
  return cookieHeader.split(';')[0]!;
}

async function registerUser(email: string, name: string): Promise<AuthenticatedUser> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/register',
    payload: {
      email,
      password: PASSWORD,
      name,
    },
  });
  expect(response.statusCode).toBe(201);
  const body = response.json<{
    user: {
      id: string;
      email: string;
      name: string | null;
    };
  }>();
  return {
    id: body.user.id,
    email: body.user.email,
    cookie: getCookie(response),
  };
}

async function createBoard(
  user: AuthenticatedUser,
  title = 'Тестовая доска',
): Promise<BoardResponse['board']> {
  const response = await app.inject({
    method: 'POST',
    url: '/api/boards',
    headers: { cookie: user.cookie },
    payload: { title },
  });
  expect(response.statusCode).toBe(201);
  return response.json<BoardResponse>().board;
}

async function getBoard(user: AuthenticatedUser, boardId: string): Promise<BoardResponse['board']> {
  const response = await app.inject({
    method: 'GET',
    url: `/api/boards/${boardId}`,
    headers: { cookie: user.cookie },
  });
  expect(response.statusCode).toBe(200);
  return response.json<BoardResponse>().board;
}

function getArchiveColumn(board: BoardResponse['board']) {
  const column = board.columns.find((item) => item.isArchive);
  if (!column) {
    throw new Error('Архивная колонка отсутствует');
  }
  return column;
}

function getRegularColumns(board: BoardResponse['board']) {
  return board.columns.filter((column) => !column.isArchive);
}

async function createColumn(user: AuthenticatedUser, boardId: string, title: string) {
  const response = await app.inject({
    method: 'POST',
    url: `/api/boards/${boardId}` + '/columns',
    headers: { cookie: user.cookie },
    payload: { title },
  });
  return response;
}

async function createTask(
  user: AuthenticatedUser,
  boardId: string,
  columnId: string,
  title = 'Тестовая задача',
) {
  return app.inject({
    method: 'POST',
    url: `/api/boards/${boardId}` + `/columns/${columnId}` + '/tasks',
    headers: { cookie: user.cookie },
    payload: {
      title,
      description: 'Описание задачи',
      priority: 'medium',
      tags: ['test'],
      dueDate: null,
    },
  });
}

async function archiveTask(user: AuthenticatedUser, boardId: string, taskId: string) {
  return app.inject({
    method: 'POST',
    url: `/api/boards/${boardId}` + `/tasks/${taskId}` + '/archive',
    headers: { cookie: user.cookie },
  });
}

async function cleanupDatabase() {
  await db.session.deleteMany();
  await db.passwordCredential.deleteMany();
  await db.boardMember.deleteMany();
  await db.board.deleteMany();
  await db.user.deleteMany();
}

beforeAll(async () => {
  app = await buildApp();
  await app.ready();
});

beforeEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await cleanupDatabase();
  await app.close();
  await db.$disconnect();
});

describe('Редактирование cloud-доски', () => {
  it('создаёт колонку', async () => {
    const user = await registerUser('column-create@example.com', 'Пользователь');
    const board = await createBoard(user);
    const response = await createColumn(user, board.id, 'Новая колонка');
    expect(response.statusCode).toBe(201);
    const { board: updatedBoard } = response.json<BoardResponse>();
    expect(updatedBoard.columns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Новая колонка',
          isArchive: false,
        }),
      ]),
    );
  });

  it('не позволяет создать колонку без доступа к доске', async () => {
    const owner = await registerUser('column-owner@example.com', 'Владелец');
    const stranger = await registerUser('column-stranger@example.com', 'Чужой пользователь');
    const board = await createBoard(owner);
    const response = await createColumn(stranger, board.id, 'Недоступная колонка');
    expect([403, 404]).toContain(response.statusCode);
  });

  it('переименовывает колонку', async () => {
    const user = await registerUser('column-rename@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    expect(column).toBeDefined();
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/columns/${column!.id}`,
      headers: { cookie: user.cookie },
      payload: { title: 'Переименованная колонка' },
    });
    expect(response.statusCode).toBe(200);
    const { board: updatedBoard } = response.json<BoardResponse>();
    expect(updatedBoard.columns.find((item) => item.id === column!.id)?.title).toBe(
      'Переименованная колонка',
    );
  });

  it('не позволяет изменить архивную колонку', async () => {
    const user = await registerUser('archive-column@example.com', 'Пользователь');
    const board = await createBoard(user);
    const archive = getArchiveColumn(board);
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/columns/${archive.id}`,
      headers: { cookie: user.cookie },
      payload: { title: 'Не архив' },
    });
    expect(response.statusCode).toBe(400);
  });

  it('удаляет колонку вместе с задачами', async () => {
    const user = await registerUser('column-delete@example.com', 'Пользователь');
    let board = await createBoard(user);
    const createResponse = await createColumn(user, board.id, 'Временная колонка');
    board = createResponse.json<BoardResponse>().board;
    const column = board.columns.find((item) => item.title === 'Временная колонка');
    expect(column).toBeDefined();
    const taskResponse = await createTask(user, board.id, column!.id);
    expect(taskResponse.statusCode).toBe(201);
    const createdTask = taskResponse
      .json<BoardResponse>()
      .board.tasks.find((task) => task.title === 'Тестовая задача');
    expect(createdTask).toBeDefined();
    const deleteResponse = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${board.id}` + `/columns/${column!.id}`,
      headers: { cookie: user.cookie },
    });
    expect(deleteResponse.statusCode).toBe(200);
    const updatedBoard = deleteResponse.json<BoardResponse>().board;
    expect(updatedBoard.columns.some((item) => item.id === column!.id)).toBe(false);
    expect(updatedBoard.tasks.some((task) => task.id === createdTask!.id)).toBe(false);
  });

  it('изменяет порядок колонок', async () => {
    const user = await registerUser('column-order@example.com', 'Пользователь');
    let board = await createBoard(user);
    const response = await createColumn(user, board.id, 'Дополнительная');
    board = response.json<BoardResponse>().board;
    const columns = getRegularColumns(board);
    const reversedIds = [...columns].reverse().map((column) => column.id);
    const reorderResponse = await app.inject({
      method: 'PUT',
      url: `/api/boards/${board.id}` + '/columns/order',
      headers: { cookie: user.cookie },
      payload: { columnIds: reversedIds },
    });
    expect(reorderResponse.statusCode).toBe(200);
    const updatedBoard = reorderResponse.json<BoardResponse>().board;
    const regularIds = getRegularColumns(updatedBoard).map((column) => column.id);
    expect(regularIds).toEqual(reversedIds);
  });

  it('оставляет архивную колонку последней', async () => {
    const user = await registerUser('archive-last@example.com', 'Пользователь');
    const board = await createBoard(user);
    const regularColumns = getRegularColumns(board);
    const response = await app.inject({
      method: 'PUT',
      url: `/api/boards/${board.id}` + '/columns/order',
      headers: { cookie: user.cookie },
      payload: { columnIds: regularColumns.map((column) => column.id).reverse() },
    });
    expect(response.statusCode).toBe(200);
    const updatedBoard = response.json<BoardResponse>().board;
    expect(updatedBoard.columns.at(-1)?.isArchive).toBe(true);
  });

  it('создаёт задачу и записывает событие создания', async () => {
    const user = await registerUser('task-create@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    expect(column).toBeDefined();
    const response = await createTask(user, board.id, column!.id, 'Созданная задача');
    expect(response.statusCode).toBe(201);
    const updatedBoard = response.json<BoardResponse>().board;
    const task = updatedBoard.tasks.find((item) => item.title === 'Созданная задача');
    expect(task).toBeDefined();
    expect(task!.columnId).toBe(column!.id);
    expect(task!.history.some((event) => event.type === 'TASK_CREATED')).toBe(true);
  });

  it('не позволяет создать задачу непосредственно в архиве', async () => {
    const user = await registerUser('archive-task-create@example.com', 'Пользователь');
    const board = await createBoard(user);
    const archive = getArchiveColumn(board);
    const response = await createTask(user, board.id, archive.id);
    expect(response.statusCode).toBe(400);
  });

  it('изменяет задачу и записывает изменения в историю', async () => {
    const user = await registerUser('task-update@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const createResponse = await createTask(user, board.id, column!.id);
    const task = createResponse.json<BoardResponse>().board.tasks[0];
    expect(task).toBeDefined();
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}`,
      headers: { cookie: user.cookie },
      payload: {
        title: 'Обновлённая задача',
        priority: 'high',
      },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(updatedTask?.title).toBe('Обновлённая задача');
    expect(updatedTask?.priority).toBe('high');
    expect(updatedTask?.history.some((event) => event.type === 'TASK_UPDATED')).toBe(true);
  });

  it('не создаёт событие истории если данные задачи не изменились', async () => {
    const user = await registerUser('task-no-change@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const createResponse = await createTask(user, board.id, column!.id);
    const task = createResponse.json<BoardResponse>().board.tasks[0];
    expect(task).toBeDefined();
    const historyLengthBefore = task!.history.length;
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}`,
      headers: { cookie: user.cookie },
      payload: { title: task!.title },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(updatedTask?.history).toHaveLength(historyLengthBefore);
  });

  it('переносит задачу между колонками', async () => {
    const user = await registerUser('task-move@example.com', 'Пользователь');
    let board = await createBoard(user);
    const firstColumn = getRegularColumns(board)[0];
    const columnResponse = await createColumn(user, board.id, 'Целевая колонка');
    board = columnResponse.json<BoardResponse>().board;
    const targetColumn = board.columns.find((column) => column.title === 'Целевая колонка');
    const taskResponse = await createTask(user, board.id, firstColumn!.id);
    const task = taskResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.title === 'Тестовая задача');
    expect(task).toBeDefined();
    expect(targetColumn).toBeDefined();
    const response = await app.inject({
      method: 'PUT',
      url: `/api/boards/${board.id}` + '/tasks/order',
      headers: { cookie: user.cookie },
      payload: {
        columns: [
          {
            columnId: firstColumn!.id,
            taskIds: [],
          },
          {
            columnId: targetColumn!.id,
            taskIds: [task!.id],
          },
        ],
      },
    });

    expect(response.statusCode).toBe(200);
    const movedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(movedTask?.columnId).toBe(targetColumn!.id);
    expect(movedTask?.history.some((event) => event.type === 'TASK_MOVED')).toBe(true);
  });

  it('не записывает перемещение при изменении порядка внутри одной колонки', async () => {
    const user = await registerUser('task-reorder@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const firstResponse = await createTask(user, board.id, column!.id, 'Первая задача');
    const firstBoard = firstResponse.json<BoardResponse>().board;
    const firstTask = firstBoard.tasks.find((task) => task.title === 'Первая задача');
    const secondResponse = await createTask(user, board.id, column!.id, 'Вторая задача');
    const secondBoard = secondResponse.json<BoardResponse>().board;
    const secondTask = secondBoard.tasks.find((task) => task.title === 'Вторая задача');
    expect(firstTask).toBeDefined();
    expect(secondTask).toBeDefined();
    const response = await app.inject({
      method: 'PUT',
      url: `/api/boards/${board.id}` + '/tasks/order',
      headers: { cookie: user.cookie },
      payload: {
        columns: [
          {
            columnId: column!.id,
            taskIds: [secondTask!.id, firstTask!.id],
          },
        ],
      },
    });
    expect(response.statusCode).toBe(200);
    const updatedBoard = response.json<BoardResponse>().board;
    for (const taskId of [firstTask!.id, secondTask!.id]) {
      const task = updatedBoard.tasks.find((item) => item.id === taskId);
      expect(task?.history.some((event) => event.type === 'TASK_MOVED')).toBe(false);
    }
  });

  it('не позволяет обычным reorder перенести задачу в архив', async () => {
    const user = await registerUser('task-reorder-archive@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const archive = getArchiveColumn(board);
    const taskResponse = await createTask(user, board.id, column!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    const response = await app.inject({
      method: 'PUT',
      url: `/api/boards/${board.id}` + '/tasks/order',
      headers: { cookie: user.cookie },
      payload: {
        columns: [
          {
            columnId: column!.id,
            taskIds: [],
          },
          {
            columnId: archive.id,
            taskIds: [task!.id],
          },
        ],
      },
    });
    expect(response.statusCode).toBe(400);
  });

  it('архивирует задачу', async () => {
    const user = await registerUser('task-archive@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const archive = getArchiveColumn(board);
    const taskResponse = await createTask(user, board.id, column!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    const response = await archiveTask(user, board.id, task!.id);
    expect(response.statusCode).toBe(200);
    const archivedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(archivedTask?.columnId).toBe(archive.id);
    expect(archivedTask?.archivedAt).not.toBeNull();
    expect(archivedTask?.history.some((event) => event.type === 'TASK_ARCHIVED')).toBe(true);
  });

  it('восстанавливает задачу в выбранную колонку', async () => {
    const user = await registerUser('task-restore@example.com', 'Пользователь');
    let board = await createBoard(user);
    const sourceColumn = getRegularColumns(board)[0];
    const columnResponse = await createColumn(user, board.id, 'Колонка восстановления');
    board = columnResponse.json<BoardResponse>().board;
    const targetColumn = board.columns.find((column) => column.title === 'Колонка восстановления');
    const taskResponse = await createTask(user, board.id, sourceColumn!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    await archiveTask(user, board.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: targetColumn!.id },
    });
    expect(response.statusCode).toBe(200);
    const restoredTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(restoredTask?.columnId).toBe(targetColumn!.id);
    expect(restoredTask?.archivedAt).toBeNull();
  });

  it('восстанавливает задачу в конец выбранной колонки', async () => {
    const user = await registerUser('task-restore-position@example.com', 'Пользователь');
    let board = await createBoard(user);
    const sourceColumn = getRegularColumns(board)[0];
    const columnResponse = await createColumn(user, board.id, 'Колонка назначения');
    board = columnResponse.json<BoardResponse>().board;
    const targetColumn = board.columns.find((column) => column.title === 'Колонка назначения');
    await createTask(user, board.id, targetColumn!.id, 'Существующая задача');
    const taskResponse = await createTask(user, board.id, sourceColumn!.id, 'Архивируемая задача');
    const task = taskResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.title === 'Архивируемая задача');
    await archiveTask(user, board.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: targetColumn!.id },
    });
    expect(response.statusCode).toBe(200);
    const restoredTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task!.id);
    expect(restoredTask?.position).toBe(1);
  });

  it('не позволяет восстановить задачу без выбранной колонки', async () => {
    const user = await registerUser('task-restore-empty@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const taskResponse = await createTask(user, board.id, column!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    await archiveTask(user, board.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: {},
    });
    expect(response.statusCode).toBe(400);
  });

  it('не позволяет восстановить задачу в архивную колонку', async () => {
    const user = await registerUser('task-restore-archive@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const archive = getArchiveColumn(board);
    const taskResponse = await createTask(user, board.id, column!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    await archiveTask(user, board.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: archive.id },
    });
    expect(response.statusCode).toBe(400);
  });

  it('не позволяет восстановить задачу в колонку другой доски', async () => {
    const user = await registerUser('task-restore-other-board@example.com', 'Пользователь');
    const firstBoard = await createBoard(user, 'Первая доска');
    const secondBoard = await createBoard(user, 'Вторая доска');
    const sourceColumn = getRegularColumns(firstBoard)[0];
    const otherColumn = getRegularColumns(secondBoard)[0];
    const taskResponse = await createTask(user, firstBoard.id, sourceColumn!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    await archiveTask(user, firstBoard.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${firstBoard.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: otherColumn!.id },
    });
    expect(response.statusCode).toBe(404);
  });

  it('не позволяет восстановить задачу в несуществующую колонку', async () => {
    const user = await registerUser('task-restore-missing@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0];
    const taskResponse = await createTask(user, board.id, column!.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0];
    await archiveTask(user, board.id, task!.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task!.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: crypto.randomUUID() },
    });
    expect([400, 404]).toContain(response.statusCode);
  });

  it('не позволяет восстановить неархивную задачу', async () => {
    const user = await registerUser('task-restore-active@example.com', 'Пользователь');
    const board = await createBoard(user);
    const columns = getRegularColumns(board);
    const sourceColumn = columns[0]!;
    const targetResponse = await createColumn(user, board.id, 'Целевая');
    const updatedBoard = targetResponse.json<BoardResponse>().board;
    const targetColumn = updatedBoard.columns.find((column) => column.title === 'Целевая')!;
    const taskResponse = await createTask(user, board.id, sourceColumn.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: targetColumn.id },
    });
    expect(response.statusCode).toBe(400);
  });

  it('создаёт событие истории с выбранной колонкой при восстановлении', async () => {
    const user = await registerUser('restore-history@example.com', 'Пользователь');
    let board = await createBoard(user);
    const sourceColumn = getRegularColumns(board)[0]!;
    const columnResponse = await createColumn(user, board.id, 'Готово');
    board = columnResponse.json<BoardResponse>().board;
    const targetColumn = board.columns.find((column) => column.title === 'Готово')!;
    const taskResponse = await createTask(user, board.id, sourceColumn.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    await archiveTask(user, board.id, task.id);
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/restore',
      headers: { cookie: user.cookie },
      payload: { columnId: targetColumn.id },
    });
    const restoredTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    const restoreEvent = restoredTask.history.find((event) => event.type === 'TASK_RESTORED');
    expect(restoreEvent).toBeDefined();
    expect(restoreEvent?.payload).toMatchObject({
      toColumn: {
        id: targetColumn.id,
      },
    });
  });

  it('создаёт подзадачу и записывает событие в историю', async () => {
    const user = await registerUser('subtask-create@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/subtasks',
      headers: { cookie: user.cookie },
      payload: {
        title: 'Подзадача',
        description: 'Описание подзадачи',
      },
    });
    expect(response.statusCode).toBe(201);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.subtasks).toEqual([
      expect.objectContaining({
        title: 'Подзадача',
        description: 'Описание подзадачи',
        isCompleted: false,
        position: 0,
      }),
    ]);
    expect(updatedTask.history.some((event) => event.type === 'SUBTASK_ADDED')).toBe(true);
  });

  it('записывает завершение подзадачи в историю', async () => {
    const user = await registerUser('subtask-complete@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const createResponse = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/subtasks',
      headers: { cookie: user.cookie },
      payload: {
        title: 'Подзадача',
        description: '',
      },
    });
    const createdTask = createResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    const subtask = createdTask.subtasks[0]!;
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/subtasks/${subtask.id}`,
      headers: { cookie: user.cookie },
      payload: { isCompleted: true },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.subtasks[0]?.isCompleted).toBe(true);
    expect(updatedTask.history.some((event) => event.type === 'SUBTASK_COMPLETED')).toBe(true);
  });

  it('записывает повторное открытие подзадачи в историю', async () => {
    const user = await registerUser('subtask-reopen@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const createResponse = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/subtasks',
      headers: { cookie: user.cookie },
      payload: {
        title: 'Подзадача',
        description: '',
      },
    });
    const subtask = createResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!.subtasks[0]!;
    await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/subtasks/${subtask.id}`,
      headers: { cookie: user.cookie },
      payload: { isCompleted: true },
    });
    const reopenResponse = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/subtasks/${subtask.id}`,
      headers: { cookie: user.cookie },
      payload: { isCompleted: false },
    });
    expect(reopenResponse.statusCode).toBe(200);
    const updatedTask = reopenResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.history.some((event) => event.type === 'SUBTASK_REOPENED')).toBe(true);
  });

  it('редактирует подзадачу', async () => {
    const user = await registerUser('subtask-update@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const createResponse = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/subtasks',
      headers: { cookie: user.cookie },
      payload: {
        title: 'Старое название',
        description: 'Старое описание',
      },
    });
    const subtask = createResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!.subtasks[0]!;
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/subtasks/${subtask.id}`,
      headers: { cookie: user.cookie },
      payload: {
        title: 'Новое название',
        description: 'Новое описание',
      },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.subtasks[0]).toEqual(
      expect.objectContaining({
        title: 'Новое название',
        description: 'Новое описание',
      }),
    );
    expect(updatedTask.history.some((event) => event.type === 'SUBTASK_UPDATED')).toBe(true);
  });

  it('удаляет подзадачу и обновляет позиции', async () => {
    const user = await registerUser('subtask-delete@example.com', 'Пользователь');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    for (const title of ['Первая', 'Вторая']) {
      await app.inject({
        method: 'POST',
        url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/subtasks',
        headers: { cookie: user.cookie },
        payload: {
          title,
          description: '',
        },
      });
    }
    const currentBoard = await getBoard(user, board.id);
    const currentTask = currentBoard.tasks.find((item) => item.id === task.id)!;
    const firstSubtask = currentTask.subtasks[0]!;
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/subtasks/${firstSubtask.id}`,
      headers: { cookie: user.cookie },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.subtasks).toHaveLength(1);
    expect(updatedTask.subtasks[0]?.position).toBe(0);
    expect(updatedTask.history.some((event) => event.type === 'SUBTASK_DELETED')).toBe(true);
  });

  it('добавляет комментарий от текущего пользователя', async () => {
    const user = await registerUser('comment-create@example.com', 'Автор комментария');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const response = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/comments',
      headers: { cookie: user.cookie },
      payload: { text: 'Новый комментарий' },
    });
    expect(response.statusCode).toBe(201);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.comments).toEqual([
      expect.objectContaining({
        text: 'Новый комментарий',
      }),
    ]);
    expect(updatedTask.history.some((event) => event.type === 'COMMENT_ADDED')).toBe(true);
  });

  it('редактирует собственный комментарий', async () => {
    const user = await registerUser('comment-update@example.com', 'Автор');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const createResponse = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/comments',
      headers: { cookie: user.cookie },
      payload: { text: 'Старый комментарий' },
    });
    const comment = createResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!.comments[0]!;
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/comments/${comment.id}`,
      headers: { cookie: user.cookie },
      payload: { text: 'Обновлённый комментарий' },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.comments[0]?.text).toBe('Обновлённый комментарий');
    expect(updatedTask.history.some((event) => event.type === 'COMMENT_UPDATED')).toBe(true);
  });

  it('удаляет собственный комментарий', async () => {
    const user = await registerUser('comment-delete@example.com', 'Автор');
    const board = await createBoard(user);
    const column = getRegularColumns(board)[0]!;
    const taskResponse = await createTask(user, board.id, column.id);
    const task = taskResponse.json<BoardResponse>().board.tasks[0]!;
    const createResponse = await app.inject({
      method: 'POST',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + '/comments',
      headers: { cookie: user.cookie },
      payload: { text: 'Комментарий' },
    });
    const comment = createResponse
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!.comments[0]!;
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/boards/${board.id}` + `/tasks/${task.id}` + `/comments/${comment.id}`,
      headers: { cookie: user.cookie },
    });
    expect(response.statusCode).toBe(200);
    const updatedTask = response
      .json<BoardResponse>()
      .board.tasks.find((item) => item.id === task.id)!;
    expect(updatedTask.comments).toHaveLength(0);
    expect(updatedTask.history.some((event) => event.type === 'COMMENT_DELETED')).toBe(true);
  });
});
