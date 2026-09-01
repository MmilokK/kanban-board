import { TaskHistoryEventType, TaskPriority } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { requireBoardEditor } from '../boards/board-access.js';
import { getBoard } from '../boards/board-service.js';
import { touchBoard } from '../boards/touch-board.js';
import { createTaskHistoryEvent } from './task-history-service.js';

type JsonChange = {
  from: string | string[] | null;

  to: string | string[] | null;
};

type TaskChanges = Record<string, JsonChange>;

function mapPriority(priority: 'low' | 'medium' | 'high'): TaskPriority {
  switch (priority) {
    case 'low':
      return TaskPriority.LOW;

    case 'medium':
      return TaskPriority.MEDIUM;

    case 'high':
      return TaskPriority.HIGH;
  }
}

async function requireBoardTask(boardId: string, taskId: string) {
  const task = await db.task.findFirst({
    where: {
      id: taskId,
      column: {
        boardId,
      },
    },
    include: {
      column: true,
    },
  });

  if (!task) {
    throw new AppError('Задача не найдена', {
      statusCode: 404,
      code: 'TASK_NOT_FOUND',
    });
  }

  return task;
}

function arraysEqual(first: string[], second: string[]): boolean {
  if (first.length !== second.length) {
    return false;
  }

  return first.every((value, index) => value === second[index]);
}

export async function createTask(
  userId: string,
  boardId: string,
  columnId: string,
  input: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate: string | null;
  },
) {
  await requireBoardEditor(userId, boardId);

  const column = await db.column.findFirst({
    where: {
      id: columnId,
      boardId,
    },
  });

  if (!column) {
    throw new AppError('Колонка не найдена', {
      statusCode: 404,
      code: 'COLUMN_NOT_FOUND',
    });
  }

  if (column.isArchive) {
    throw new AppError('Нельзя создать задачу непосредственно в архиве', {
      statusCode: 400,
      code: 'ARCHIVE_COLUMN_PROTECTED',
    });
  }

  await db.$transaction(async (transaction) => {
    const taskCount = await transaction.task.count({
      where: {
        columnId,
      },
    });

    const task = await transaction.task.create({
      data: {
        columnId,
        title: input.title,
        description: input.description,
        priority: mapPriority(input.priority),
        tags: [...input.tags],
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        archivedAt: null,
        position: taskCount,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId: task.id,
      actorId: userId,
      type: TaskHistoryEventType.TASK_CREATED,
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function updateTask(
  userId: string,
  boardId: string,
  taskId: string,
  input: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    dueDate?: string | null;
  },
) {
  await requireBoardEditor(userId, boardId);

  const task = await requireBoardTask(boardId, taskId);
  const changes: TaskChanges = {};

  if (input.title !== undefined && input.title !== task.title) {
    changes.title = {
      from: task.title,
      to: input.title,
    };
  }

  if (input.description !== undefined && input.description !== task.description) {
    changes.description = {
      from: task.description,
      to: input.description,
    };
  }

  if (input.priority !== undefined) {
    const nextPriority = mapPriority(input.priority);

    if (nextPriority !== task.priority) {
      changes.priority = {
        from: task.priority,
        to: nextPriority,
      };
    }
  }

  if (input.tags !== undefined && !arraysEqual(task.tags, input.tags)) {
    changes.tags = {
      from: task.tags,
      to: input.tags,
    };
  }

  if (input.dueDate !== undefined) {
    const currentDueDate = task.dueDate?.toISOString() ?? null;
    const nextDueDate = input.dueDate ? new Date(input.dueDate).toISOString() : null;

    if (currentDueDate !== nextDueDate) {
      changes.dueDate = {
        from: currentDueDate,
        to: nextDueDate,
      };
    }
  }

  if (Object.keys(changes).length === 0) {
    return getBoard(userId, boardId);
  }

  await db.$transaction(async (transaction) => {
    await transaction.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),

        ...(input.description !== undefined ? { description: input.description } : {}),

        ...(input.priority !== undefined ? { priority: mapPriority(input.priority) } : {}),

        ...(input.tags !== undefined ? { tags: [...input.tags] } : {}),

        ...(input.dueDate !== undefined
          ? { dueDate: input.dueDate ? new Date(input.dueDate) : null }
          : {}),
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.TASK_UPDATED,
      payload: changes,
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function deleteTask(userId: string, boardId: string, taskId: string) {
  await requireBoardEditor(userId, boardId);

  const task = await requireBoardTask(boardId, taskId);

  await db.$transaction(async (transaction) => {
    await transaction.task.delete({
      where: {
        id: taskId,
      },
    });

    const remainingTasks = await transaction.task.findMany({
      where: {
        columnId: task.columnId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    for (const [index, remainingTask] of remainingTasks.entries()) {
      await transaction.task.update({
        where: {
          id: remainingTask.id,
        },
        data: {
          position: -(index + 1),
        },
      });
    }

    for (const [index, remainingTask] of remainingTasks.entries()) {
      await transaction.task.update({
        where: {
          id: remainingTask.id,
        },
        data: {
          position: index,
        },
      });
    }

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function reorderTasks(
  userId: string,
  boardId: string,
  input: Array<{
    columnId: string;
    taskIds: string[];
  }>,
) {
  await requireBoardEditor(userId, boardId);

  const requestedColumnIds = input.map((column) => column.columnId);

  if (new Set(requestedColumnIds).size !== requestedColumnIds.length) {
    throw new AppError('Колонка указана несколько раз', {
      statusCode: 400,
      code: 'INVALID_TASK_ORDER',
    });
  }

  const columns = await db.column.findMany({
    where: {
      boardId,
      id: {
        in: requestedColumnIds,
      },
    },
  });

  if (columns.length !== requestedColumnIds.length) {
    throw new AppError('Некорректные колонки', {
      statusCode: 400,
      code: 'INVALID_TASK_ORDER',
    });
  }

  if (columns.some((column) => column.isArchive)) {
    throw new AppError('Архивная колонка недоступна для обычного перемещения', {
      statusCode: 400,
      code: 'ARCHIVE_COLUMN_PROTECTED',
    });
  }

  const requestedTaskIds = input.flatMap((column) => column.taskIds);

  if (new Set(requestedTaskIds).size !== requestedTaskIds.length) {
    throw new AppError('Задача указана несколько раз', {
      statusCode: 400,
      code: 'INVALID_TASK_ORDER',
    });
  }

  const tasks = await db.task.findMany({
    where: {
      id: {
        in: requestedTaskIds,
      },
      column: {
        boardId,
      },
    },
    include: {
      column: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  if (tasks.length !== requestedTaskIds.length) {
    throw new AppError('Некорректный порядок задач', {
      statusCode: 400,
      code: 'INVALID_TASK_ORDER',
    });
  }

  const originalColumnByTaskId = new Map(tasks.map((task) => [task.id, task.column]));
  const targetColumnById = new Map(columns.map((column) => [column.id, column]));

  await db.$transaction(async (transaction) => {
    let temporaryPosition = -1;

    for (const taskId of requestedTaskIds) {
      await transaction.task.update({
        where: {
          id: taskId,
        },
        data: {
          position: temporaryPosition,
        },
      });
      temporaryPosition -= 1;
    }

    for (const column of input) {
      for (const [position, taskId] of column.taskIds.entries()) {
        await transaction.task.update({
          where: {
            id: taskId,
          },
          data: {
            columnId: column.columnId,
            position,
          },
        });

        const previousColumn = originalColumnByTaskId.get(taskId);

        if (!previousColumn || previousColumn.id === column.columnId) {
          continue;
        }

        const targetColumn = targetColumnById.get(column.columnId);

        await createTaskHistoryEvent(transaction, {
          taskId,
          actorId: userId,
          type: TaskHistoryEventType.TASK_MOVED,
          payload: {
            fromColumn: {
              id: previousColumn.id,
              title: previousColumn.title,
            },
            toColumn: {
              id: column.columnId,
              title: targetColumn?.title ?? '',
            },
          },
        });
      }
    }

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function archiveTask(userId: string, boardId: string, taskId: string) {
  await requireBoardEditor(userId, boardId);

  const task = await requireBoardTask(boardId, taskId);

  if (task.column.isArchive) {
    throw new AppError('Задача уже находится в архиве', {
      statusCode: 400,
      code: 'TASK_ALREADY_ARCHIVED',
    });
  }

  const archiveColumn = await db.column.findFirst({
    where: {
      boardId,
      isArchive: true,
    },
  });

  if (!archiveColumn) {
    throw new AppError('Архивная колонка не найдена', {
      statusCode: 500,
      code: 'ARCHIVE_COLUMN_MISSING',
    });
  }

  await db.$transaction(async (transaction) => {
    const archiveTaskCount = await transaction.task.count({
      where: {
        columnId: archiveColumn.id,
      },
    });

    await transaction.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId: archiveColumn.id,
        position: archiveTaskCount,
        archivedAt: new Date(),
      },
    });

    const remainingTasks = await transaction.task.findMany({
      where: {
        columnId: task.columnId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    for (const [index, remainingTask] of remainingTasks.entries()) {
      await transaction.task.update({
        where: {
          id: remainingTask.id,
        },
        data: {
          position: -(index + 1),
        },
      });
    }

    for (const [index, remainingTask] of remainingTasks.entries()) {
      await transaction.task.update({
        where: {
          id: remainingTask.id,
        },
        data: {
          position: index,
        },
      });
    }

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.TASK_ARCHIVED,
      payload: {
        fromColumn: {
          id: task.column.id,
          title: task.column.title,
        },
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function restoreTask(
  userId: string,
  boardId: string,
  taskId: string,
  targetColumnId: string,
) {
  await requireBoardEditor(userId, boardId);

  const task = await requireBoardTask(boardId, taskId);

  if (!task.column.isArchive) {
    throw new AppError('Задача не находится в архиве', {
      statusCode: 400,
      code: 'TASK_NOT_ARCHIVED',
    });
  }

  const targetColumn = await db.column.findFirst({
    where: {
      id: targetColumnId,
      boardId,
    },
  });

  if (!targetColumn) {
    throw new AppError('Колонка для восстановления не найдена', {
      statusCode: 404,
      code: 'COLUMN_NOT_FOUND',
    });
  }

  if (targetColumn.isArchive) {
    throw new AppError('Нельзя восстановить задачу в архивную колонку', {
      statusCode: 400,
      code: 'ARCHIVE_COLUMN_PROTECTED',
    });
  }

  await db.$transaction(async (transaction) => {
    const targetTaskCount = await transaction.task.count({
      where: {
        columnId: targetColumn.id,
      },
    });

    await transaction.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId: targetColumn.id,
        position: targetTaskCount,
        archivedAt: null,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.TASK_RESTORED,
      payload: {
        toColumn: {
          id: targetColumn.id,
          title: targetColumn.title,
        },
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}
