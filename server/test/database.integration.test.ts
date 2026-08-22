import { afterAll, describe, expect, it } from 'vitest';

import { db } from '../src/db/client.js';

describe('Подключение к PostgreSQL', () => {
  afterAll(async () => {
    await db.$disconnect();
  });

  it('выполняет запрос к базе данных', async () => {
    const result = await db.$queryRaw<
      Array<{
        value: number;
      }>
    >`
            SELECT 1 AS value
          `;

    expect(result).toEqual([
      {
        value: 1,
      },
    ]);
  });
});
