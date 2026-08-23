import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { BoardMemberRole, PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });

const db = new PrismaClient({ adapter });

async function main() {
  const user = await db.user.upsert({
    where: {
      email: 'demo@example.com',
    },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  });

  const existingBoard = await db.board.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
          role: BoardMemberRole.OWNER,
        },
      },
    },
  });

  if (existingBoard) {
    return;
  }

  await db.board.create({
    data: {
      title: 'Kanban Board',
      members: {
        create: {
          userId: user.id,
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
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
