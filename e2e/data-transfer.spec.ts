import { expect, test, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

type ExportData = {
  format: string;
  version: number;
  exportedAt: string;
  schemaVersion: number;

  data: {
    boards: Record<
      string,
      {
        id: string;
        title: string;
        columnIds: string[];
        createdAt: string;
        updatedAt: string;
      }
    >;

    boardOrder: string[];

    activeBoardId: string | null;

    columns: Record<string, unknown>;

    tasks: Record<string, unknown>;

    schemaVersion: number;
  };
};

const DEFAULT_BOARD_TITLE = 'Kanban Board';

const IMPORTED_BOARD_TITLE = 'Импортированная доска';

async function exportCurrentData(page: Page): Promise<ExportData> {
  const downloadPromise = page.waitForEvent('download');

  await page
    .getByRole('button', {
      name: 'Экспорт JSON',
      exact: true,
    })
    .click();

  const download = await downloadPromise;

  const path = await download.path();

  if (!path) {
    throw new Error('Файл экспорта не найден');
  }

  const source = await readFile(path, 'utf8');

  return JSON.parse(source) as ExportData;
}

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);
}

test.describe('Импорт и экспорт данных', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('экспортирует данные в JSON-файл', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');

    await page
      .getByRole('button', {
        name: 'Экспорт JSON',
        exact: true,
      })
      .click();

    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/^kanban-board-\d{4}-\d{2}-\d{2}-\d{4}\.json$/);
  });

  test('экспортированный файл содержит данные приложения', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');

    await page
      .getByRole('button', {
        name: 'Экспорт JSON',
        exact: true,
      })
      .click();

    const download = await downloadPromise;

    const path = await download.path();

    expect(path).not.toBeNull();

    if (!path) {
      throw new Error('Файл экспорта не найден');
    }

    const fs = await import('node:fs/promises');

    const source = await fs.readFile(path, 'utf8');

    const data = JSON.parse(source) as {
      format: string;
      data: {
        boards: Record<
          string,
          {
            title: string;
          }
        >;
      };
    };

    expect(data.format).toBe('kanban-board-export');

    expect(
      Object.values(data.data.boards).some((board) => board.title === DEFAULT_BOARD_TITLE),
    ).toBe(true);
  });

  test('показывает ошибку при импорте повреждённого JSON', async ({ page }) => {
    const input = page.getByLabel('Выбрать JSON-файл для импорта');

    await input.setInputFiles({
      name: 'broken.json',
      mimeType: 'application/json',
      buffer: Buffer.from('{ broken json'),
    });

    await expect(page.getByRole('alert')).toHaveText('Файл содержит некорректный JSON.');
  });

  test('отклоняет посторонний JSON-файл', async ({ page }) => {
    const input = page.getByLabel('Выбрать JSON-файл для импорта');

    await input.setInputFiles({
      name: 'other.json',
      mimeType: 'application/json',
      buffer: Buffer.from(
        JSON.stringify({
          foo: 'bar',
        }),
      ),
    });

    await expect(page.getByRole('alert')).toHaveText('Файл не является экспортом Kanban Board.');
  });

  test('импортирует корректные данные', async ({ page }) => {
    const exportData = await exportCurrentData(page);

    const boardId = exportData.data.activeBoardId;

    if (!boardId) {
      throw new Error('Активная доска не найдена');
    }

    const board = exportData.data.boards[boardId];

    if (!board) {
      throw new Error('Активная доска отсутствует в экспортированных данных');
    }

    board.title = IMPORTED_BOARD_TITLE;

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');

      await dialog.accept();
    });

    await page.getByLabel('Выбрать JSON-файл для импорта').setInputFiles({
      name: 'kanban-import.json',

      mimeType: 'application/json',

      buffer: Buffer.from(JSON.stringify(exportData)),
    });

    await expect(page.locator('#board-title')).toHaveText(IMPORTED_BOARD_TITLE);

    await expect(
      page.getByText('Данные успешно импортированы.', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('не заменяет данные при отмене импорта', async ({ page }) => {
    const exportData = await exportCurrentData(page);

    const boardId = exportData.data.activeBoardId;

    if (!boardId) {
      throw new Error('Активная доска не найдена');
    }

    const board = exportData.data.boards[boardId];

    if (!board) {
      throw new Error('Активная доска отсутствует в экспортированных данных');
    }

    board.title = IMPORTED_BOARD_TITLE;

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');

      await dialog.dismiss();
    });

    await page.getByLabel('Выбрать JSON-файл для импорта').setInputFiles({
      name: 'kanban-import.json',

      mimeType: 'application/json',

      buffer: Buffer.from(JSON.stringify(exportData)),
    });

    await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

    await expect(
      page.getByText('Данные успешно импортированы.', {
        exact: true,
      }),
    ).toHaveCount(0);
  });
});
