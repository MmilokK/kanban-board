import { BoardMemberRole, TaskPriority } from '../generated/prisma/client.js';
import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { mapBoard, mapBoardListItem } from './board-mapper.js';

type ImportBoardInput = {
  title: string;
  columns: Array<{
    title: string;
    isCompleted: boolean;
    isArchive: boolean;
    tasks: Array<{
      title: string;
      description: string;
      priority: 'low' | 'medium' | 'high';
      tags: string[];
      dueDate: string | null;
      archivedAt: string | null;
      subtasks: Array<{
        title: string;
        description: string;
        isCompleted: boolean;
      }>;
      comments: Array<{
        text: string;
        createdAt: string;
        updatedAt: string;
      }>;
    }>;
  }>;
};

async function requireBoardOwner(userId: string, boardId: string) {
  const membership = await db.boardMember.findUnique({
    where: {
      boardId_userId: {
        boardId,
        userId,
      },
    },
  });

  if (!membership) {
    throw new AppError('Доска не найдена', {
      statusCode: 404,
      code: 'BOARD_NOT_FOUND',
    });
  }

  if (membership.role !== BoardMemberRole.OWNER) {
    throw new AppError('Недостаточно прав', {
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  }

  return membership;
}

function mapImportedPriority(priority: 'low' | 'medium' | 'high'): TaskPriority {
  switch (priority) {
    case 'low':
      return TaskPriority.LOW;
    case 'medium':
      return TaskPriority.MEDIUM;
    case 'high':
      return TaskPriority.HIGH;
  }
}

export async function createBoard(userId: string, title: string) {
  const board = await db.board.create({
    data: {
      title,
      members: {
        create: {
          userId,
          role: BoardMemberRole.OWNER,
        },
      },
      columns: {
        create: [
          {
            title: 'Backlog',
            position: 0,
          },
          {
            title: 'To do',
            position: 1,
          },
          {
            title: 'In progress',
            position: 2,
          },
          {
            title: 'Done',
            position: 3,
            isCompleted: true,
          },
          {
            title: 'Archive',
            position: 4,
            isArchive: true,
          },
        ],
      },
    },
    include: {
      members: {
        where: {
          userId,
        },
      },
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
              comments: true,
            },
          },
        },
      },
    },
  });

  return mapBoard(board);
}

export async function getBoards(userId: string) {
  const boards = await db.board.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return boards.map(mapBoardListItem);
}

export async function getBoard(userId: string, boardId: string) {
  const board = await db.board.findFirst({
    where: {
      id: boardId,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
      },
      columns: {
        orderBy: {
          position: 'asc',
        },
        include: {
          tasks: {
            orderBy: {
              position: 'asc',
            },
            include: {
              subtasks: {
                orderBy: {
                  position: 'asc',
                },
              },
              comments: {
                orderBy: {
                  createdAt: 'asc',
                },
              },
            },
          },
        },
      },
    },
  });

  if (!board) {
    throw new AppError('Доска не найдена', {
      statusCode: 404,
      code: 'BOARD_NOT_FOUND',
    });
  }

  return mapBoard(board);
}

export async function renameBoard(userId: string, boardId: string, title: string) {
  await requireBoardOwner(userId, boardId);

  await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      title,
    },
  });

  return getBoard(userId, boardId);
}

export async function deleteBoard(userId: string, boardId: string): Promise<void> {
  await requireBoardOwner(userId, boardId);

  await db.board.delete({
    where: {
      id: boardId,
    },
  });
}

export async function importBoard(userId: string, input: ImportBoardInput) {
  const hasArchive = input.columns.some((column) => column.isArchive);
  const columns = [
    ...input.columns,
    ...(hasArchive
      ? []
      : [
          {
            title: 'Archive',
            isCompleted: false,
            isArchive: true,
            tasks: [],
          },
        ]),
  ];
  const board = await db.board.create({
    data: {
      title: input.title,
      members: {
        create: {
          userId,
          role: BoardMemberRole.OWNER,
        },
      },
      columns: {
        create: columns.map((column, columnIndex) => ({
          title: column.title,
          position: columnIndex,
          isCompleted: column.isCompleted,
          isArchive: column.isArchive,
          tasks: {
            create: column.tasks.map((task, taskIndex) => ({
              title: task.title,
              description: task.description,
              priority: mapImportedPriority(task.priority),
              tags: [...task.tags],
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              archivedAt: task.archivedAt ? new Date(task.archivedAt) : null,
              position: taskIndex,
              subtasks: {
                create: task.subtasks.map((subtask, subtaskIndex) => ({
                  title: subtask.title,
                  description: subtask.description,
                  isCompleted: subtask.isCompleted,
                  position: subtaskIndex,
                })),
              },
              comments: {
                create: task.comments.map((comment) => ({
                  text: comment.text,
                  authorId: null,
                  createdAt: new Date(comment.createdAt),
                  updatedAt: new Date(comment.updatedAt),
                })),
              },
            })),
          },
        })),
      },
    },
    include: {
      members: {
        where: {
          userId,
        },
      },
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
              comments: true,
            },
          },
        },
      },
    },
  });

  return mapBoard(board);
}
