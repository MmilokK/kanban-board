import type { Prisma } from '../generated/prisma/client.js';

export function touchBoard(transaction: Prisma.TransactionClient, boardId: string) {
  return transaction.board.update({
    where: {
      id: boardId,
    },
    data: {
      updatedAt: new Date(),
    },
  });
}
