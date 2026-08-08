import { expect, test, type Locator, type Page } from '@playwright/test';

const DEFAULT_BOARD_TITLE = 'Kanban Board';
const TASK_COLUMN_TITLE = 'Backlog';

const FIRST_TASK_TITLE = 'Первая задача';
const SECOND_TASK_TITLE = 'Вторая задача';
const THIRD_TASK_TITLE = 'Третья задача';

type TaskData = {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  dueDate?: string;
};

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);
}

function getColumn(page: Page, columnTitle: string): Locator {
  return page
    .getByRole('heading', {
      name: columnTitle,
      exact: true,
      level: 2,
    })
    .locator('xpath=ancestor::section[1]');
}

function getTaskCard(page: Page, taskTitle: string): Locator {
  return page
    .getByText(taskTitle, {
      exact: true,
    })
    .locator('xpath=ancestor::article[1]');
}

function getUndoSnackbar(page: Page): Locator {
  return page.getByRole('status').filter({
    has: page.getByRole('button', {
      name: 'Отменить',
      exact: true,
    }),
  });
}

async function createTask(
  page: Page,
  columnTitle: string,
  { title, description = '', priority = 'medium', tags = [], dueDate }: TaskData,
) {
  const column = getColumn(page, columnTitle);

  await expect(column).toBeVisible();

  await column
    .getByRole('button', {
      name: /создать задачу|добавить задачу/i,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Новая задача',
  });

  await expect(dialog).toBeVisible();

  await dialog
    .getByRole('textbox', {
      name: /название|заголовок/i,
    })
    .fill(title);

  if (description) {
    await dialog
      .getByRole('textbox', {
        name: /описание/i,
      })
      .fill(description);
  }

  await dialog
    .getByRole('combobox', {
      name: /приоритет/i,
    })
    .selectOption(priority);

  if (tags.length > 0) {
    await dialog
      .getByRole('textbox', {
        name: /теги/i,
      })
      .fill(tags.join(', '));
  }

  if (dueDate) {
    await dialog.getByLabel('Срок выполнения').fill(dueDate);
  }

  await dialog
    .getByRole('button', {
      name: /создать задачу/i,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(
    page.getByText(title, {
      exact: true,
    }),
  ).toBeVisible();
}

async function deleteTask(page: Page, taskTitle: string) {
  await page
    .getByRole('button', {
      name: `Удалить задачу ${taskTitle}`,
      exact: true,
    })
    .click();

  await expect(
    page.getByText(taskTitle, {
      exact: true,
    }),
  ).toHaveCount(0);

  await expect(getUndoSnackbar(page)).toContainText(`Задача «${taskTitle}» удалена`);
}

async function undoDeletion(page: Page) {
  await getUndoSnackbar(page)
    .getByRole('button', {
      name: 'Отменить',
      exact: true,
    })
    .click();

  await expect(getUndoSnackbar(page)).toHaveCount(0);
}

async function getTaskTitles(page: Page, columnTitle: string): Promise<string[]> {
  const cards = getColumn(page, columnTitle).locator('article');

  const count = await cards.count();

  const titles: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);

    const heading = card.getByRole('heading');

    titles.push((await heading.textContent()) ?? '');
  }

  return titles;
}

test.describe('Отмена удаления задачи', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('показывает уведомление после удаления задачи', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    const snackbar = getUndoSnackbar(page);

    await expect(snackbar).toBeVisible();

    await expect(snackbar).toContainText(`Задача «${FIRST_TASK_TITLE}» удалена`);

    await expect(
      snackbar.getByRole('button', {
        name: 'Отменить',
        exact: true,
      }),
    ).toBeEnabled();

    await expect(
      snackbar.getByRole('button', {
        name: 'Закрыть уведомление',
        exact: true,
      }),
    ).toBeEnabled();
  });

  test('восстанавливает удалённую задачу', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
      description: 'Описание задачи',
      priority: 'high',
      tags: ['Работа', 'Undo'],
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    await undoDeletion(page);

    await expect(
      page.getByText(FIRST_TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText('Описание задачи', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('восстанавливает задачу в исходную колонку', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    await undoDeletion(page);

    const backlog = getColumn(page, TASK_COLUMN_TITLE);

    await expect(
      backlog.getByText(FIRST_TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('восстанавливает задачу на прежнюю позицию', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await createTask(page, TASK_COLUMN_TITLE, {
      title: SECOND_TASK_TITLE,
    });

    await createTask(page, TASK_COLUMN_TITLE, {
      title: THIRD_TASK_TITLE,
    });

    const orderBefore = await getTaskTitles(page, TASK_COLUMN_TITLE);

    await deleteTask(page, SECOND_TASK_TITLE);

    await undoDeletion(page);

    const orderAfter = await getTaskTitles(page, TASK_COLUMN_TITLE);

    expect(orderAfter).toEqual(orderBefore);
  });

  test('восстанавливает дедлайн и остальные данные задачи', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
      description: 'Задача с дедлайном',
      priority: 'high',
      tags: ['Важное', 'Тест'],
      dueDate: '2099-12-31',
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    await undoDeletion(page);

    const taskCard = getTaskCard(page, FIRST_TASK_TITLE);

    await expect(taskCard).toContainText(FIRST_TASK_TITLE);

    await expect(taskCard).toContainText('Задача с дедлайном');

    await expect(taskCard).toContainText(`Срок: 31.12.2099`);
  });

  test('закрывает уведомление без восстановления задачи', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    const snackbar = getUndoSnackbar(page);

    await snackbar
      .getByRole('button', {
        name: 'Закрыть уведомление',
        exact: true,
      })
      .click();

    await expect(snackbar).toHaveCount(0);

    await expect(
      page.getByText(FIRST_TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('после второго удаления предлагает восстановить только последнюю задачу', async ({
    page,
  }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await createTask(page, TASK_COLUMN_TITLE, {
      title: SECOND_TASK_TITLE,
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    await expect(getUndoSnackbar(page)).toContainText(FIRST_TASK_TITLE);

    await deleteTask(page, SECOND_TASK_TITLE);

    const snackbar = getUndoSnackbar(page);

    await expect(snackbar).toContainText(SECOND_TASK_TITLE);

    await expect(snackbar).not.toContainText(FIRST_TASK_TITLE);

    await undoDeletion(page);

    await expect(
      page.getByText(SECOND_TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText(FIRST_TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('не восстанавливает задачу после перезагрузки страницы', async ({ page }) => {
    await createTask(page, TASK_COLUMN_TITLE, {
      title: FIRST_TASK_TITLE,
    });

    await deleteTask(page, FIRST_TASK_TITLE);

    await page.reload();

    await expect(
      page.getByText(FIRST_TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(getUndoSnackbar(page)).toHaveCount(0);
  });
});
