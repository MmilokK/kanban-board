import { expect, test, type Locator, type Page } from '@playwright/test';

const BOARD_TITLE = 'Kanban Board';

const COLUMN_TITLE = 'Backlog';

const TASK_TITLE = 'Задача с историей';

const SUBTASK_TITLE = 'Написать тесты';

const COMMENT_TEXT = 'Проверить реализацию';

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

function getEditDialog(page: Page): Locator {
  return page.getByRole('dialog', {
    name: 'Редактирование задачи',
  });
}

function getHistorySection(page: Page): Locator {
  return getEditDialog(page)
    .getByRole('heading', {
      name: 'История',
      exact: true,
    })
    .locator('xpath=ancestor::section[1]');
}

async function createTask(page: Page) {
  const column = getColumn(page, COLUMN_TITLE);

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
    .fill(TASK_TITLE);

  await dialog
    .getByRole('button', {
      name: /создать задачу/i,
    })
    .click();

  await expect(dialog).toBeHidden();
}

async function openTask(page: Page) {
  await page
    .getByRole('button', {
      name: `Изменить задачу ${TASK_TITLE}`,
      exact: true,
    })
    .click();

  await expect(getEditDialog(page)).toBeVisible();
}

test.describe('История изменений задачи', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);

    await createTask(page);

    await openTask(page);
  });

  test('показывает создание задачи', async ({ page }) => {
    await expect(
      getHistorySection(page).getByText('Задача создана', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('записывает изменение задачи', async ({ page }) => {
    const dialog = getEditDialog(page);

    await dialog
      .getByRole('combobox', {
        name: 'Приоритет',
      })
      .selectOption('high');

    await dialog
      .getByRole('button', {
        name: 'Сохранить изменения',
        exact: true,
      })
      .click();

    await openTask(page);

    await expect(getHistorySection(page)).toContainText('Приоритет');
  });

  test('записывает добавление подзадачи', async ({ page }) => {
    const dialog = getEditDialog(page);

    const subtaskSection = dialog
      .getByRole('heading', {
        name: 'Подзадачи',
        exact: true,
      })
      .locator('xpath=ancestor::section[1]');

    const inputs = subtaskSection.getByRole('textbox');

    await inputs.nth(0).fill(SUBTASK_TITLE);

    await subtaskSection
      .getByRole('button', {
        name: 'Добавить подзадачу',
        exact: true,
      })
      .click();

    await expect(
      getHistorySection(page).getByText(`Добавлена подзадача «${SUBTASK_TITLE}»`, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('записывает выполнение подзадачи', async ({ page }) => {
    const dialog = getEditDialog(page);

    const subtaskSection = dialog
      .getByRole('heading', {
        name: 'Подзадачи',
        exact: true,
      })
      .locator('xpath=ancestor::section[1]');

    await subtaskSection.getByRole('textbox').nth(0).fill(SUBTASK_TITLE);

    await subtaskSection
      .getByRole('button', {
        name: 'Добавить подзадачу',
        exact: true,
      })
      .click();

    await subtaskSection
      .getByRole('checkbox', {
        name: new RegExp(SUBTASK_TITLE, 'i'),
      })
      .check();

    await expect(
      getHistorySection(page).getByText(`Подзадача «${SUBTASK_TITLE}» выполнена`, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('записывает добавление комментария', async ({ page }) => {
    const dialog = getEditDialog(page);

    const comments = dialog
      .getByRole('heading', {
        name: 'Комментарии',
        exact: true,
      })
      .locator('xpath=ancestor::section[1]');

    await comments
      .getByRole('textbox', {
        name: 'Новый комментарий',
        exact: true,
      })
      .fill(COMMENT_TEXT);

    await comments
      .getByRole('button', {
        name: 'Добавить комментарий',
        exact: true,
      })
      .click();

    await expect(
      getHistorySection(page).getByText('Добавлен комментарий', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('сохраняет историю после перезагрузки', async ({ page }) => {
    await expect(
      getHistorySection(page).getByText('Задача создана', {
        exact: true,
      }),
    ).toBeVisible();

    await page.reload();

    await openTask(page);

    await expect(
      getHistorySection(page).getByText('Задача создана', {
        exact: true,
      }),
    ).toBeVisible();
  });
});
