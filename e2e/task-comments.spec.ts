import { expect, test, type Locator, type Page } from '@playwright/test';

const BOARD_TITLE = 'Kanban Board';

const COLUMN_TITLE = 'Backlog';

const TASK_TITLE = 'Задача с комментариями';

const FIRST_COMMENT = 'Проверить реализацию';

const UPDATED_COMMENT = 'Проверить реализацию и тесты';

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

function getCommentsSection(page: Page): Locator {
  return getEditDialog(page)
    .getByRole('heading', {
      name: 'Комментарии',
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

async function addComment(page: Page, text: string) {
  const comments = getCommentsSection(page);

  await comments
    .getByRole('textbox', {
      name: 'Новый комментарий',
    })
    .fill(text);

  await comments
    .getByRole('button', {
      name: 'Добавить комментарий',
      exact: true,
    })
    .click();

  await expect(
    comments.getByText(text, {
      exact: true,
    }),
  ).toBeVisible();
}

test.describe('Комментарии задачи', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);

    await createTask(page);

    await openTask(page);
  });

  test('показывает пустое состояние комментариев', async ({ page }) => {
    await expect(
      getCommentsSection(page).getByText('Комментариев пока нет.', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('добавляет комментарий', async ({ page }) => {
    await addComment(page, FIRST_COMMENT);

    await expect(
      getCommentsSection(page).getByText(FIRST_COMMENT, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('добавляет несколько комментариев', async ({ page }) => {
    await addComment(page, 'Первый комментарий');

    await addComment(page, 'Второй комментарий');

    const comments = getCommentsSection(page);

    await expect(
      comments.getByText('Первый комментарий', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      comments.getByText('Второй комментарий', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('редактирует комментарий', async ({ page }) => {
    await addComment(page, FIRST_COMMENT);

    const comments = getCommentsSection(page);

    await comments
      .getByRole('button', {
        name: `Изменить комментарий ${FIRST_COMMENT}`,
        exact: true,
      })
      .click();

    const input = comments.getByRole('textbox', {
      name: 'Комментарий',
      exact: true,
    });

    await input.clear();

    await input.fill(UPDATED_COMMENT);

    await comments
      .getByRole('button', {
        name: 'Сохранить',
        exact: true,
      })
      .click();

    await expect(
      comments.getByText(UPDATED_COMMENT, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      comments.getByText('изменён', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('удаляет комментарий', async ({ page }) => {
    await addComment(page, FIRST_COMMENT);

    const comments = getCommentsSection(page);

    await comments
      .getByRole('button', {
        name: `Удалить комментарий ${FIRST_COMMENT}`,
        exact: true,
      })
      .click();

    await expect(
      comments.getByText(FIRST_COMMENT, {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(
      comments.getByText('Комментариев пока нет.', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('показывает количество комментариев на карточке', async ({ page }) => {
    await addComment(page, FIRST_COMMENT);

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

    await expect(taskCard.getByLabel('Комментариев: 1')).toBeVisible();
  });

  test('сохраняет комментарии после перезагрузки', async ({ page }) => {
    await addComment(page, FIRST_COMMENT);

    await page.reload();

    await openTask(page);

    await expect(
      getCommentsSection(page).getByText(FIRST_COMMENT, {
        exact: true,
      }),
    ).toBeVisible();
  });
});
