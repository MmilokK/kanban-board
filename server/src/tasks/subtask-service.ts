import { TaskHistoryEventType } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { requireBoardEditor } from '../boards/board-access.js';
import { getBoard } from '../boards/board-service.js';
import { touchBoard } from '../boards/touch-board.js';
import { createTaskHistoryEvent } from './task-history-service.js';

type SubtaskChange = {
  from: string | boolean;

  to: string | boolean;
};

type SubtaskChanges = Record<string, SubtaskChange>;

async function requireTask(boardId: string, taskId: string) {
  const task = await db.task.findFirst({
    where: {
      id: taskId,
      column: {
        boardId,
      },
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

export async function createSubtask(
  userId: string,
  boardId: string,
  taskId: string,
  input: {
    title: string;
    description: string;
  },
) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);
  await db.$transaction(async (transaction) => {
    const subtaskCount = await transaction.subtask.count({
      where: {
        taskId,
      },
    });

    const subtask = await transaction.subtask.create({
      data: {
        taskId,
        title: input.title,
        description: input.description,
        isCompleted: false,
        position: subtaskCount,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.SUBTASK_ADDED,
      payload: {
        subtaskId: subtask.id,
        title: subtask.title,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function updateSubtask(
  userId: string,
  boardId: string,
  taskId: string,
  subtaskId: string,
  input: {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  },
) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);

  const subtask = await db.subtask.findFirst({
    where: {
      id: subtaskId,
      taskId,
    },
  });

  if (!subtask) {
    throw new AppError('Подзадача не найдена', {
      statusCode: 404,
      code: 'SUBTASK_NOT_FOUND',
    });
  }

  const changes: SubtaskChanges = {};

  if (input.title !== undefined && input.title !== subtask.title) {
    changes.title = {
      from: subtask.title,
      to: input.title,
    };
  }

  if (input.description !== undefined && input.description !== subtask.description) {
    changes.description = {
      from: subtask.description,
      to: input.description,
    };
  }

  if (input.isCompleted !== undefined && input.isCompleted !== subtask.isCompleted) {
    changes.isCompleted = {
      from: subtask.isCompleted,
      to: input.isCompleted,
    };
  }

  if (Object.keys(changes).length === 0) {
    return getBoard(userId, boardId);
  }

  await db.$transaction(async (transaction) => {
    await transaction.subtask.update({
      where: {
        id: subtaskId,
      },
      data: {
        ...input,
      },
    });

    let type: TaskHistoryEventType = TaskHistoryEventType.SUBTASK_UPDATED;

    if (input.isCompleted === true && subtask.isCompleted === false) {
      type = TaskHistoryEventType.SUBTASK_COMPLETED;
    }

    if (input.isCompleted === false && subtask.isCompleted === true) {
      type = TaskHistoryEventType.SUBTASK_REOPENED;
    }

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type,
      payload: {
        subtaskId,
        changes,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function deleteSubtask(
  userId: string,
  boardId: string,
  taskId: string,
  subtaskId: string,
) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);

  const subtask = await db.subtask.findFirst({
    where: {
      id: subtaskId,
      taskId,
    },
  });

  if (!subtask) {
    throw new AppError('Подзадача не найдена', {
      statusCode: 404,
      code: 'SUBTASK_NOT_FOUND',
    });
  }

  await db.$transaction(async (transaction) => {
    await transaction.subtask.delete({
      where: {
        id: subtaskId,
      },
    });
    const remainingSubtasks = await transaction.subtask.findMany({
      where: {
        taskId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    for (const [position, item] of remainingSubtasks.entries()) {
      if (item.position === position) {
        continue;
      }

      await transaction.subtask.update({
        where: {
          id: item.id,
        },
        data: {
          position,
        },
      });
    }

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.SUBTASK_DELETED,
      payload: {
        subtaskId,
        title: subtask.title,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}
