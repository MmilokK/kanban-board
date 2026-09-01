import type { Prisma } from '../generated/prisma/client.js';
import { TaskHistoryEventType } from '../generated/prisma/client.js';

type TransactionClient = Prisma.TransactionClient;

export async function createTaskHistoryEvent(
  transaction: TransactionClient,
  input: {
    taskId: string;
    actorId: string | null;
    type: TaskHistoryEventType;
    payload?: Prisma.InputJsonValue;
  },
): Promise<void> {
  await transaction.taskHistoryEvent.create({
    data: {
      taskId: input.taskId,
      actorId: input.actorId,
      type: input.type,
      ...(input.payload !== undefined
        ? {
            payload: input.payload,
          }
        : {}),
    },
  });
}
