import { expect, test, type Locator, type Page } from '@playwright/test';

const BOARD_TITLE = 'Kanban Board';

const COLUMN_TITLE = 'Backlog';

const TASK_TITLE = 'Задача с подзадачами';

const FIRST_SUBTASK = 'Написать код';

const FIRST_DESCRIPTION = 'Реализовать store';

const SECOND_SUBTASK = 'Написать тесты';

const SECOND_DESCRIPTION = 'Проверить Vitest и Playwright';

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

async function addSubtask(page: Page, title: string, description: string) {
  const dialog = getEditDialog(page);

  const subtaskSection = dialog
    .getByRole('heading', {
      name: 'Подзадачи',
    })
    .locator('xpath=ancestor::section[1]');

  const inputs = subtaskSection.getByRole('textbox');

  await inputs.nth(0).fill(title);

  await inputs.nth(1).fill(description);

  await subtaskSection
    .getByRole('button', {
      name: 'Добавить подзадачу',
      exact: true,
    })
    .click();

  await expect(
    subtaskSection.getByText(title, {
      exact: true,
    }),
  ).toBeVisible();
}

test.describe('Подзадачи', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);

    await createTask(page);

    await openTask(page);
  });

  test('добавляет подзадачу с описанием', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    const dialog = getEditDialog(page);

    await expect(
      dialog.getByText(FIRST_SUBTASK, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      dialog.getByText(FIRST_DESCRIPTION, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('добавляет несколько подзадач', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    await addSubtask(page, SECOND_SUBTASK, SECOND_DESCRIPTION);

    await expect(
      getEditDialog(page).getByText('0 из 2', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('отмечает подзадачу выполненной', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    const checkbox = getEditDialog(page).getByRole('checkbox', {
      name: /Написать код/i,
    });

    await checkbox.check();

    await expect(checkbox).toBeChecked();

    await expect(
      getEditDialog(page).getByText('1 из 1', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('редактирует название и описание подзадачи', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    const dialog = getEditDialog(page);

    await dialog
      .getByRole('button', {
        name: `Редактировать подзадачу ${FIRST_SUBTASK}`,
        exact: true,
      })
      .click();

    const subtaskSection = dialog
      .getByRole('heading', {
        name: 'Подзадачи',
      })
      .locator('xpath=ancestor::section[1]');

    const inputs = subtaskSection.getByRole('textbox');

    await inputs.nth(0).fill('Проверить код');

    await inputs.nth(1).fill('Проверить реализацию store');

    await subtaskSection
      .getByRole('button', {
        name: 'Сохранить',
        exact: true,
      })
      .click();

    await expect(
      dialog.getByText('Проверить код', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      dialog.getByText('Проверить реализацию store', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('удаляет подзадачу', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    const dialog = getEditDialog(page);

    await dialog
      .getByRole('button', {
        name: `Удалить подзадачу ${FIRST_SUBTASK}`,
        exact: true,
      })
      .click();

    await expect(
      dialog.getByText(FIRST_SUBTASK, {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      dialog.getByText('Подзадач пока нет.', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('показывает прогресс подзадач на карточке', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    await addSubtask(page, SECOND_SUBTASK, SECOND_DESCRIPTION);

    await getEditDialog(page)
      .getByRole('checkbox', {
        name: /Написать код/i,
      })
      .check();

    await getEditDialog(page)
      .getByRole('button', {
        name: /закрыть/i,
      })
      .click();

    const taskCard = page
      .getByText(TASK_TITLE, {
        exact: true,
      })
      .locator('xpath=ancestor::article[1]');

    await expect(taskCard).toContainText('1 из 2');

    await expect(taskCard.getByLabel('Выполнено подзадач 1 из 2')).toBeVisible();
  });

  test('сохраняет подзадачи после перезагрузки', async ({ page }) => {
    await addSubtask(page, FIRST_SUBTASK, FIRST_DESCRIPTION);

    await page.reload();

    await openTask(page);

    await expect(
      getEditDialog(page).getByText(FIRST_SUBTASK, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      getEditDialog(page).getByText(FIRST_DESCRIPTION, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
