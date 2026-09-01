import type {
  BoardMemberRole,
  Prisma,
  TaskHistoryEventType,
  TaskPriority,
} from '../generated/prisma/client.js';
import type { BoardDto, BoardListItemDto } from './board-types.js';

function mapPriority(priority: TaskPriority): 'low' | 'medium' | 'high' {
  switch (priority) {
    case 'LOW':
      return 'low';
    case 'MEDIUM':
      return 'medium';
    case 'HIGH':
      return 'high';
  }
}

function mapRole(role: BoardMemberRole): 'OWNER' | 'EDITOR' | 'VIEWER' {
  return role;
}

export function mapBoardListItem(board: {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  members: Array<{
    role: BoardMemberRole;
  }>;
}): BoardListItemDto {
  const membership = board.members[0];

  if (!membership) {
    throw new Error('Board membership отсутствует');
  }

  return {
    id: board.id,
    title: board.title,
    role: mapRole(membership.role),
    createdAt: board.createdAt.toISOString(),
    updatedAt: board.updatedAt.toISOString(),
  };
}

export function mapBoard(board: {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  members: Array<{
    role: BoardMemberRole;
  }>;
  columns: Array<{
    id: string;
    title: string;
    position: number;
    isCompleted: boolean;
    isArchive: boolean;
    tasks: Array<{
      id: string;
      columnId: string;
      title: string;
      description: string;
      priority: TaskPriority;
      tags: string[];
      dueDate: Date | null;
      archivedAt: Date | null;
      position: number;
      createdAt: Date;
      updatedAt: Date;
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
        createdAt: Date;
        updatedAt: Date;
      }>;
      historyEvents: Array<{
        id: string;
        type: TaskHistoryEventType;
        payload: Prisma.JsonValue | null;
        createdAt: Date;
        actor: {
          id: string;
          name: string | null;
        } | null;
      }>;
    }>;
  }>;
}): BoardDto {
  const membership = board.members[0];

  if (!membership) {
    throw new Error('Board membership отсутствует');
  }

  return {
    id: board.id,
    title: board.title,
    role: mapRole(membership.role),
    columns: board.columns
      .map((column) => ({
        id: column.id,
        title: column.title,
        position: column.position,
        isCompleted: column.isCompleted,
        isArchive: column.isArchive,
      }))
      .sort((first, second) => first.position - second.position),
    tasks: board.columns
      .flatMap((column) => column.tasks)
      .map((task) => ({
        id: task.id,
        columnId: task.columnId,
        title: task.title,
        description: task.description,
        priority: mapPriority(task.priority),
        tags: [...task.tags],
        dueDate: task.dueDate?.toISOString() ?? null,
        archivedAt: task.archivedAt?.toISOString() ?? null,
        position: task.position,
        subtasks: task.subtasks
          .map((subtask) => ({
            id: subtask.id,
            title: subtask.title,
            description: subtask.description,
            isCompleted: subtask.isCompleted,
            position: subtask.position,
          }))
          .sort((first, second) => first.position - second.position),
        comments: task.comments
          .map((comment) => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt.toISOString(),
            updatedAt: comment.updatedAt.toISOString(),
          }))
          .sort((first, second) => first.createdAt.localeCompare(second.createdAt)),
        history: task.historyEvents
          .map((event) => ({
            id: event.id,
            type: event.type,
            payload: event.payload,
            actor: event.actor
              ? {
                  id: event.actor.id,
                  name: event.actor.name,
                }
              : null,
            createdAt: event.createdAt.toISOString(),
          }))
          .sort((first, second) => first.createdAt.localeCompare(second.createdAt)),
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
      })),
    createdAt: board.createdAt.toISOString(),
    updatedAt: board.updatedAt.toISOString(),
  };
}
