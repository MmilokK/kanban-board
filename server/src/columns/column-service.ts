import { db } from '../db/client.js';
import { AppError } from '../errors/app-error.js';
import { requireBoardEditor } from '../boards/board-access.js';
import { getBoard } from '../boards/board-service.js';
import { touchBoard } from '../boards/touch-board.js';

async function findBoardColumn(boardId: string, columnId: string) {
  return db.column.findFirst({
    where: {
      id: columnId,
      boardId,
    },
  });
}

async function requireEditableColumn(boardId: string, columnId: string) {
  const column = await findBoardColumn(boardId, columnId);

  if (!column) {
    throw new AppError('Колонка не найдена', {
      statusCode: 404,
      code: 'COLUMN_NOT_FOUND',
    });
  }

  if (column.isArchive) {
    throw new AppError('Архивную колонку нельзя изменять', {
      statusCode: 400,
      code: 'ARCHIVE_COLUMN_PROTECTED',
    });
  }

  return column;
}

export async function createColumn(userId: string, boardId: string, title: string) {
  await requireBoardEditor(userId, boardId);
  await db.$transaction(async (transaction) => {
    const columns = await transaction.column.findMany({
      where: {
        boardId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    const archive = columns.find((column) => column.isArchive);
    const regularColumns = columns.filter((column) => !column.isArchive);
    const position = regularColumns.length;

    if (archive) {
      await transaction.column.update({
        where: {
          id: archive.id,
        },
        data: {
          position: -1,
        },
      });
    }

    await transaction.column.create({
      data: {
        boardId,
        title,
        position,
        isCompleted: false,
        isArchive: false,
      },
    });

    if (archive) {
      await transaction.column.update({
        where: {
          id: archive.id,
        },
        data: {
          position: regularColumns.length + 1,
        },
      });
    }

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function renameColumn(
  userId: string,
  boardId: string,
  columnId: string,
  title: string,
) {
  await requireBoardEditor(userId, boardId);
  await requireEditableColumn(boardId, columnId);
  await db.$transaction(async (transaction) => {
    await transaction.column.update({
      where: {
        id: columnId,
      },
      data: {
        title,
      },
    });

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}

export async function deleteColumn(userId: string, boardId: string, columnId: string) {
  await requireBoardEditor(userId, boardId);
  await requireEditableColumn(boardId, columnId);
  await db.$transaction(async (transaction) => {
    await transaction.column.delete({
      where: {
        id: columnId,
      },
    });

    const columns = await transaction.column.findMany({
      where: {
        boardId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    for (const [index, column] of columns.entries()) {
      await transaction.column.update({
        where: {
          id: column.id,
        },
        data: {
          position: -(index + 1),
        },
      });
    }

    for (const [index, column] of columns.entries()) {
      await transaction.column.update({
        where: {
          id: column.id,
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

export async function reorderColumns(userId: string, boardId: string, columnIds: string[]) {
  await requireBoardEditor(userId, boardId);

  const columns = await db.column.findMany({
    where: {
      boardId,
    },
    orderBy: {
      position: 'asc',
    },
  });

  const regularColumns = columns.filter((column) => !column.isArchive);
  const archive = columns.find((column) => column.isArchive);
  const regularIds = regularColumns.map((column) => column.id);
  const uniqueIds = new Set(columnIds);
  const isValid =
    uniqueIds.size === columnIds.length &&
    columnIds.length === regularIds.length &&
    regularIds.every((columnId) => uniqueIds.has(columnId));

  if (!isValid) {
    throw new AppError('Некорректный порядок колонок', {
      statusCode: 400,
      code: 'INVALID_COLUMN_ORDER',
    });
  }

  await db.$transaction(async (transaction) => {
    for (const [index, columnId] of columnIds.entries()) {
      await transaction.column.update({
        where: {
          id: columnId,
        },
        data: {
          position: -(index + 1),
        },
      });
    }

    if (archive) {
      await transaction.column.update({
        where: {
          id: archive.id,
        },
        data: {
          position: -(columnIds.length + 1),
        },
      });
    }

    for (const [index, columnId] of columnIds.entries()) {
      await transaction.column.update({
        where: {
          id: columnId,
        },
        data: {
          position: index,
        },
      });
    }

    if (archive) {
      await transaction.column.update({
        where: {
          id: archive.id,
        },
        data: {
          position: columnIds.length,
        },
      });
    }

    await touchBoard(transaction, boardId);
  });

  return getBoard(userId, boardId);
}
