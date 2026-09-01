import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import { apiErrorSchema } from '../schemas/api-response-schema.js';
import { boardResponseSchema } from '../boards/board-schema.js';
import {
  boardContentParamsSchema,
  columnParamsSchema,
  columnTaskParamsSchema,
  commentParamsSchema,
  createColumnSchema,
  createCommentSchema,
  createSubtaskSchema,
  createTaskSchema,
  reorderColumnsSchema,
  reorderTasksSchema,
  restoreTaskSchema,
  subtaskParamsSchema,
  taskParamsSchema,
  updateColumnSchema,
  updateCommentSchema,
  updateSubtaskSchema,
  updateTaskSchema,
} from '../boards/board-mutation-schema.js';
import { requireAuth } from '../auth/require-auth.js';
import {
  createColumn,
  deleteColumn,
  renameColumn,
  reorderColumns,
} from '../columns/column-service.js';
import {
  archiveTask,
  createTask,
  deleteTask,
  reorderTasks,
  restoreTask,
  updateTask,
} from '../tasks/task-service.js';
import { createSubtask, deleteSubtask, updateSubtask } from '../tasks/subtask-service.js';
import { createComment, deleteComment, updateComment } from '../tasks/comment-service.js';

const security = [
  {
    sessionCookie: [],
  },
];

const mutationResponses = {
  200: boardResponseSchema,
  400: apiErrorSchema,
  401: apiErrorSchema,
  403: apiErrorSchema,
  404: apiErrorSchema,
};

export async function registerBoardContentRoutes(app: FastifyInstance): Promise<void> {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.post(
    '/:boardId/columns',
    {
      schema: {
        tags: ['Columns'],
        summary: 'Создать колонку',
        security,
        params: boardContentParamsSchema,
        body: createColumnSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await createColumn(user.id, request.params.boardId, request.body.title);

      return reply.status(201).send({
        board,
      });
    },
  );

  typedApp.patch(
    '/:boardId/columns/:columnId',
    {
      schema: {
        tags: ['Columns'],
        summary: 'Переименовать колонку',
        security,
        params: columnParamsSchema,
        body: updateColumnSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await renameColumn(
        user.id,
        request.params.boardId,
        request.params.columnId,
        request.body.title,
      );

      return {
        board,
      };
    },
  );

  typedApp.delete(
    '/:boardId/columns/:columnId',
    {
      schema: {
        tags: ['Columns'],
        summary: 'Удалить колонку',
        security,
        params: columnParamsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await deleteColumn(user.id, request.params.boardId, request.params.columnId);

      return {
        board,
      };
    },
  );

  typedApp.put(
    '/:boardId/columns/order',
    {
      schema: {
        tags: ['Columns'],
        summary: 'Изменить порядок колонок',
        security,
        params: boardContentParamsSchema,
        body: reorderColumnsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await reorderColumns(user.id, request.params.boardId, request.body.columnIds);

      return {
        board,
      };
    },
  );

  typedApp.post(
    '/:boardId/columns/:columnId/tasks',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Создать задачу',
        security,
        params: columnTaskParamsSchema,
        body: createTaskSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await createTask(
        user.id,
        request.params.boardId,
        request.params.columnId,
        request.body,
      );

      return reply.status(201).send({
        board,
      });
    },
  );

  typedApp.patch(
    '/:boardId/tasks/:taskId',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Изменить задачу',
        security,
        params: taskParamsSchema,
        body: updateTaskSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await updateTask(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.body,
      );

      return {
        board,
      };
    },
  );

  typedApp.delete(
    '/:boardId/tasks/:taskId',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Удалить задачу',
        security,
        params: taskParamsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await deleteTask(user.id, request.params.boardId, request.params.taskId);

      return {
        board,
      };
    },
  );

  typedApp.put(
    '/:boardId/tasks/order',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Изменить порядок задач',
        security,
        params: boardContentParamsSchema,
        body: reorderTasksSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await reorderTasks(user.id, request.params.boardId, request.body.columns);

      return {
        board,
      };
    },
  );

  typedApp.post(
    '/:boardId/tasks/:taskId/archive',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Архивировать задачу',
        security,
        params: taskParamsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await archiveTask(user.id, request.params.boardId, request.params.taskId);

      return {
        board,
      };
    },
  );

  typedApp.post(
    '/:boardId/tasks/:taskId/restore',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Восстановить задачу в выбранную колонку',
        description: 'Восстанавливает архивированную задачу в выбранную неархивную колонку.',
        security,
        params: taskParamsSchema,
        body: restoreTaskSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await restoreTask(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.body.columnId,
      );

      return {
        board,
      };
    },
  );

  typedApp.post(
    '/:boardId/tasks/:taskId/subtasks',
    {
      schema: {
        tags: ['Subtasks'],
        summary: 'Создать подзадачу',
        security,
        params: taskParamsSchema,
        body: createSubtaskSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await createSubtask(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.body,
      );

      return reply.status(201).send({
        board,
      });
    },
  );

  typedApp.patch(
    '/:boardId/tasks/:taskId/subtasks/:subtaskId',
    {
      schema: {
        tags: ['Subtasks'],
        summary: 'Изменить подзадачу',
        security,
        params: subtaskParamsSchema,
        body: updateSubtaskSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await updateSubtask(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.params.subtaskId,
        request.body,
      );

      return {
        board,
      };
    },
  );

  typedApp.delete(
    '/:boardId/tasks/:taskId/subtasks/:subtaskId',
    {
      schema: {
        tags: ['Subtasks'],
        summary: 'Удалить подзадачу',
        security,
        params: subtaskParamsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await deleteSubtask(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.params.subtaskId,
      );

      return {
        board,
      };
    },
  );

  typedApp.post(
    '/:boardId/tasks/:taskId/comments',
    {
      schema: {
        tags: ['Comments'],
        summary: 'Добавить комментарий',
        security,
        params: taskParamsSchema,
        body: createCommentSchema,
        response: {
          201: boardResponseSchema,
          400: apiErrorSchema,
          401: apiErrorSchema,
          403: apiErrorSchema,
          404: apiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const user = await requireAuth(request);
      const board = await createComment(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.body.text,
      );

      return reply.status(201).send({
        board,
      });
    },
  );

  typedApp.patch(
    '/:boardId/tasks/:taskId/comments/:commentId',
    {
      schema: {
        tags: ['Comments'],
        summary: 'Изменить комментарий',
        security,
        params: commentParamsSchema,
        body: updateCommentSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await updateComment(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.params.commentId,
        request.body.text,
      );

      return {
        board,
      };
    },
  );

  typedApp.delete(
    '/:boardId/tasks/:taskId/comments/:commentId',
    {
      schema: {
        tags: ['Comments'],
        summary: 'Удалить комментарий',
        security,
        params: commentParamsSchema,
        response: mutationResponses,
      },
    },
    async (request) => {
      const user = await requireAuth(request);
      const board = await deleteComment(
        user.id,
        request.params.boardId,
        request.params.taskId,
        request.params.commentId,
      );

      return {
        board,
      };
    },
  );
}
