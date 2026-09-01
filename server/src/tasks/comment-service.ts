import { TaskHistoryEventType } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { requireBoardEditor } from '../boards/board-access.js';
import { getBoard } from '../boards/board-service.js';
import { touchBoard } from '../boards/touch-board.js';
import { createTaskHistoryEvent } from './task-history-service.js';

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

export async function createComment(userId: string, boardId: string, taskId: string, text: string) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);
  await db.$transaction(async (transaction) => {
    const comment = await transaction.comment.create({
      data: {
        taskId,
        authorId: userId,
        text,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.COMMENT_ADDED,
      payload: {
        commentId: comment.id,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function updateComment(
  userId: string,
  boardId: string,
  taskId: string,
  commentId: string,
  text: string,
) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);

  const comment = await db.comment.findFirst({
    where: {
      id: commentId,
      taskId,
    },
  });

  if (!comment) {
    throw new AppError('Комментарий не найден', {
      statusCode: 404,
      code: 'COMMENT_NOT_FOUND',
    });
  }

  if (comment.authorId !== userId) {
    throw new AppError('Можно изменять только собственные комментарии', {
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  }

  if (comment.text === text) {
    return getBoard(userId, boardId);
  }

  await db.$transaction(async (transaction) => {
    await transaction.comment.update({
      where: {
        id: commentId,
      },
      data: {
        text,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.COMMENT_UPDATED,
      payload: {
        commentId,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function deleteComment(
  userId: string,
  boardId: string,
  taskId: string,
  commentId: string,
) {
  await requireBoardEditor(userId, boardId);
  await requireTask(boardId, taskId);

  const comment = await db.comment.findFirst({
    where: {
      id: commentId,
      taskId,
    },
  });

  if (!comment) {
    throw new AppError('Комментарий не найден', {
      statusCode: 404,
      code: 'COMMENT_NOT_FOUND',
    });
  }

  if (comment.authorId !== userId) {
    throw new AppError('Можно удалять только собственные комментарии', {
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  }

  await db.$transaction(async (transaction) => {
    await transaction.comment.delete({
      where: {
        id: commentId,
      },
    });

    await createTaskHistoryEvent(transaction, {
      taskId,
      actorId: userId,
      type: TaskHistoryEventType.COMMENT_DELETED,
      payload: {
        commentId,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}
