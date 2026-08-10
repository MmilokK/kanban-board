import { expect, test, type Locator, type Page } from '@playwright/test';

const BOARD_TITLE = 'Kanban Board';

const BACKLOG_COLUMN = 'Backlog';

const TODO_COLUMN = 'To do';

const DONE_COLUMN = 'Done';

const TASK_TITLE = 'Задача для архива';

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('#board-title')).toHaveText(BOARD_TITLE);
}

function getColumn(page: Page, title: string): Locator {
  return page
    .getByRole('heading', {
      level: 2,
      name: title,
      exact: true,
    })
    .locator('xpath=ancestor::section[1]');
}

function getArchiveButton(page: Page): Locator {
  return page.getByRole('button', {
    name: /Архив \(\d+\)/,
  });
}

async function createTask(page: Page, columnTitle: string, taskTitle: string) {
  const column = getColumn(page, columnTitle);

  await column
    .getByRole('button', {
      name: /создать задачу|добавить задачу/i,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Новая задача',
  });

  await dialog
    .getByRole('textbox', {
      name: /название|заголовок/i,
    })
    .fill(taskTitle);

  await dialog
    .getByRole('button', {
      name: /создать задачу/i,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(
    column.getByText(taskTitle, {
      exact: true,
    }),
  ).toBeVisible();
}

async function archiveTask(page: Page, taskTitle: string) {
  await page
    .getByRole('button', {
      name: `Архивировать задачу ${taskTitle}`,
      exact: true,
    })
    .click();

  await expect(
    page.getByText(taskTitle, {
      exact: true,
    }),
  ).toHaveCount(0);
}

async function openArchive(page: Page) {
  await getArchiveButton(page).click();

  await expect(
    page.getByRole('heading', {
      name: 'Архив задач',
      exact: true,
    }),
  ).toBeVisible();
}

test.describe('Архив задач', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('не показывает архивную колонку на доске', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 2,
        name: 'Archive',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('архивирует задачу из незавершённой колонки', async ({ page }) => {
    await createTask(page, BACKLOG_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await expect(getArchiveButton(page)).toHaveText('Архив (1)');
  });

  test('архивирует выполненную задачу', async ({ page }) => {
    await createTask(page, DONE_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await expect(getArchiveButton(page)).toHaveText('Архив (1)');
  });

  test('показывает архивированную задачу', async ({ page }) => {
    await createTask(page, BACKLOG_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await openArchive(page);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('восстанавливает задачу в выбранную колонку', async ({ page }) => {
    await createTask(page, BACKLOG_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await openArchive(page);

    await page
      .getByRole('combobox', {
        name: 'Восстановить в',
      })
      .selectOption({
        label: TODO_COLUMN,
      });

    await page
      .getByRole('button', {
        name: 'Восстановить',
        exact: true,
      })
      .click();

    const todoColumn = getColumn(page, TODO_COLUMN);

    await expect(
      todoColumn.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(getArchiveButton(page)).toHaveText('Архив (0)');
  });

  test('окончательно удаляет задачу из архива', async ({ page }) => {
    await createTask(page, BACKLOG_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await openArchive(page);

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');

      await dialog.accept();
    });

    await page
      .getByRole('button', {
        name: `Удалить из архива задачу ${TASK_TITLE}`,
        exact: true,
      })
      .click();

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      page.getByText('В архиве пока нет задач.', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(getArchiveButton(page)).toHaveText('Архив (0)');
  });

  test('сохраняет архив после перезагрузки', async ({ page }) => {
    await createTask(page, BACKLOG_COLUMN, TASK_TITLE);

    await archiveTask(page, TASK_TITLE);

    await page.reload();

    await expect(getArchiveButton(page)).toHaveText('Архив (1)');

    await openArchive(page);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
