import { expect, test, type Locator, type Page } from '@playwright/test';

const DEFAULT_BOARD_TITLE = 'Kanban Board';

const DEADLINES_BOARD_TITLE = 'Доска сроков';

const BACKLOG_COLUMN_TITLE = 'Backlog';

const DONE_COLUMN_TITLE = 'Done';

type TaskPriority = 'low' | 'medium' | 'high';

type TaskDraft = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  tags?: string[];
  dueDate?: string | null;
};

function getBoardToolbar(page: Page): Locator {
  return page.getByRole('toolbar', {
    name: 'Управление досками',
  });
}

function getBoardSelect(page: Page): Locator {
  return getBoardToolbar(page).getByRole('combobox', {
    name: 'Доска',
  });
}

function getColumn(page: Page, columnTitle: string): Locator {
  return page
    .getByRole('heading', {
      name: columnTitle,
      level: 2,
      exact: true,
    })
    .locator('xpath=ancestor::section[1]');
}

function getTaskTitle(page: Page, taskTitle: string): Locator {
  return page.getByText(taskTitle, {
    exact: true,
  });
}

function getTaskCard(page: Page, taskTitle: string): Locator {
  return getTaskTitle(page, taskTitle).locator('xpath=ancestor::article[1]');
}

function getDueFilter(page: Page): Locator {
  return page.getByRole('combobox', {
    name: 'Срок',
    exact: true,
  });
}

function getSortSelect(page: Page): Locator {
  return page.getByRole('combobox', {
    name: 'Сортировка',
    exact: true,
  });
}

async function createBoard(page: Page, title: string) {
  await getBoardToolbar(page)
    .getByRole('button', {
      name: 'Новая доска',
      exact: true,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Новая доска',
    exact: true,
  });

  await expect(dialog).toBeVisible();

  await dialog
    .getByRole('textbox', {
      name: 'Название',
      exact: true,
    })
    .fill(title);

  await dialog
    .getByRole('button', {
      name: 'Создать',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(page.locator('#board-title')).toHaveText(title);

  await expect(getBoardSelect(page).locator('option:checked')).toHaveText(title);
}

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

  await expect(getBoardSelect(page)).toBeVisible();

  await createBoard(page, DEADLINES_BOARD_TITLE);

  await expect(getDueFilter(page)).toBeVisible();
}

async function createTask(page: Page, columnTitle: string, task: TaskDraft) {
  const column = getColumn(page, columnTitle);

  await expect(column).toBeVisible();

  await column
    .getByRole('button', {
      name: /создать задачу|добавить задачу/i,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Новая задача',
    exact: true,
  });

  await expect(dialog).toBeVisible();

  await dialog
    .getByRole('textbox', {
      name: /название|заголовок/i,
    })
    .fill(task.title);

  if (task.description) {
    await dialog.getByLabel(/описание/i).fill(task.description);
  }

  await dialog
    .getByRole('combobox', {
      name: /приоритет/i,
    })
    .selectOption(task.priority ?? 'medium');

  if (task.tags && task.tags.length > 0) {
    await dialog.getByLabel(/теги/i).fill(task.tags.join(', '));
  }

  if (task.dueDate) {
    await dialog
      .getByLabel('Срок выполнения', {
        exact: true,
      })
      .fill(task.dueDate);
  }

  await dialog
    .getByRole('button', {
      name: /^(Создать задачу|Создать)$/,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(getTaskTitle(page, task.title)).toBeVisible();
}

async function openTaskEditor(page: Page, taskTitle: string): Promise<Locator> {
  const taskCard = getTaskCard(page, taskTitle);

  await expect(taskCard).toBeVisible();

  await taskCard
    .getByRole('button', {
      name: `Изменить задачу ${taskTitle}`,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: /Редактирование задачи/i,
  });

  await expect(dialog).toBeVisible();

  return dialog;
}

async function updateTaskDueDate(page: Page, taskTitle: string, dueDate: string | null) {
  const dialog = await openTaskEditor(page, taskTitle);

  const dueDateInput = dialog.getByLabel('Срок выполнения', {
    exact: true,
  });

  if (dueDate === null) {
    await dueDateInput.clear();
  } else {
    await dueDateInput.fill(dueDate);
  }

  await dialog
    .getByRole('button', {
      name: /^Сохранить изменения$/,
    })
    .click();

  await expect(dialog).toBeHidden();
}

async function expectTaskVisible(page: Page, taskTitle: string) {
  await expect(getTaskTitle(page, taskTitle)).toBeVisible();
}

async function expectTaskHidden(page: Page, taskTitle: string) {
  await expect(getTaskTitle(page, taskTitle)).toHaveCount(0);
}

async function expectTaskOrder(page: Page, columnTitle: string, expectedTitles: string[]) {
  const taskCards = getColumn(page, columnTitle).locator('article');

  await expect(taskCards).toHaveCount(expectedTitles.length);

  for (const [index, expectedTitle] of expectedTitles.entries()) {
    await expect(taskCards.nth(index)).toContainText(expectedTitle);
  }
}

async function getRelativeDateValue(page: Page, dayOffset: number): Promise<string> {
  return page.evaluate((offset) => {
    const date = new Date();

    date.setHours(12, 0, 0, 0);

    date.setDate(date.getDate() + offset);

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, dayOffset);
}

function formatDateForDisplay(dateValue: string): string {
  const year = dateValue.slice(0, 4);

  const month = dateValue.slice(5, 7);

  const day = dateValue.slice(8, 10);

  return `${day}.${month}.${year}`;
}

test.describe('Сроки выполнения задач', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('создаёт задачу со сроком', async ({ page }) => {
    const taskTitle = 'Подготовить релиз';

    const futureDate = await getRelativeDateValue(page, 5);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskTitle,
      description: 'Проверить сборку приложения',
      priority: 'high',
      tags: ['Релиз'],
      dueDate: futureDate,
    });

    const taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toBeVisible();

    await expect(taskCard).toContainText(`Срок: ${formatDateForDisplay(futureDate)}`);

    await expect(taskCard).toHaveAttribute('data-due-status', 'upcoming');
  });

  test('показывает просроченную задачу', async ({ page }) => {
    const taskTitle = 'Просроченная задача';

    const overdueDate = await getRelativeDateValue(page, -1);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskTitle,
      dueDate: overdueDate,
    });

    const taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'overdue');

    await expect(
      taskCard.getByText('Просрочено', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(taskCard).toContainText(formatDateForDisplay(overdueDate));
  });

  test('показывает задачу на сегодня', async ({ page }) => {
    const taskTitle = 'Задача на сегодня';

    const today = await getRelativeDateValue(page, 0);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskTitle,
      dueDate: today,
    });

    const taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'today');

    await expect(
      taskCard.getByText('Сегодня', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(taskCard).toContainText(formatDateForDisplay(today));
  });

  test('не помечает задачу завершённой колонки как просроченную', async ({ page }) => {
    const taskTitle = 'Завершённая задача';

    const overdueDate = await getRelativeDateValue(page, -3);

    await createTask(page, DONE_COLUMN_TITLE, {
      title: taskTitle,
      dueDate: overdueDate,
    });

    const taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'completed');

    await expect(
      taskCard.getByText('Просрочено', {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(taskCard).toContainText(formatDateForDisplay(overdueDate));
  });

  test('фильтрует просроченные задачи', async ({ page }) => {
    const overdueTaskTitle = 'Просрочить документацию';

    const futureTaskTitle = 'Запланировать релиз';

    const taskWithoutDateTitle = 'Задача без срока';

    const overdueDate = await getRelativeDateValue(page, -2);

    const futureDate = await getRelativeDateValue(page, 7);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: overdueTaskTitle,
      dueDate: overdueDate,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: futureTaskTitle,
      dueDate: futureDate,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskWithoutDateTitle,
      dueDate: null,
    });

    await getDueFilter(page).selectOption('overdue');

    await expect(getDueFilter(page)).toHaveValue('overdue');

    await expectTaskVisible(page, overdueTaskTitle);

    await expectTaskHidden(page, futureTaskTitle);

    await expectTaskHidden(page, taskWithoutDateTitle);

    await expect(
      page.getByText('Показано 1 из 3', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('фильтрует задачи без срока', async ({ page }) => {
    const taskWithDateTitle = 'Задача со сроком';

    const taskWithoutDateTitle = 'Задача без срока';

    const futureDate = await getRelativeDateValue(page, 4);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskWithDateTitle,
      dueDate: futureDate,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskWithoutDateTitle,
      dueDate: null,
    });

    await getDueFilter(page).selectOption('without-date');

    await expect(getDueFilter(page)).toHaveValue('without-date');

    await expectTaskVisible(page, taskWithoutDateTitle);

    await expectTaskHidden(page, taskWithDateTitle);

    await expect(
      page.getByText('Показано 1 из 2', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('сортирует задачи по ближайшему сроку', async ({ page }) => {
    const nearestTaskTitle = 'Ближайший срок';

    const middleTaskTitle = 'Средний срок';

    const distantTaskTitle = 'Дальний срок';

    const taskWithoutDateTitle = 'Без установленного срока';

    const nearestDate = await getRelativeDateValue(page, 2);

    const middleDate = await getRelativeDateValue(page, 5);

    const distantDate = await getRelativeDateValue(page, 10);

    /*
     * Создаём задачи не в порядке
     * ожидаемой сортировки.
     */
    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: distantTaskTitle,
      dueDate: distantDate,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskWithoutDateTitle,
      dueDate: null,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: nearestTaskTitle,
      dueDate: nearestDate,
    });

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: middleTaskTitle,
      dueDate: middleDate,
    });

    await getSortSelect(page).selectOption('due-asc');

    await expect(getSortSelect(page)).toHaveValue('due-asc');

    await expectTaskOrder(page, BACKLOG_COLUMN_TITLE, [
      nearestTaskTitle,
      middleTaskTitle,
      distantTaskTitle,
      taskWithoutDateTitle,
    ]);
  });

  test('изменяет и удаляет срок задачи', async ({ page }) => {
    const taskTitle = 'Изменяемый срок';

    const futureDate = await getRelativeDateValue(page, 8);

    const overdueDate = await getRelativeDateValue(page, -1);

    await createTask(page, BACKLOG_COLUMN_TITLE, {
      title: taskTitle,
      dueDate: futureDate,
    });

    let taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'upcoming');

    await updateTaskDueDate(page, taskTitle, overdueDate);

    taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'overdue');

    await expect(taskCard).toContainText(formatDateForDisplay(overdueDate));

    await expect(
      taskCard.getByText('Просрочено', {
        exact: true,
      }),
    ).toBeVisible();

    await updateTaskDueDate(page, taskTitle, null);

    taskCard = getTaskCard(page, taskTitle);

    await expect(taskCard).toHaveAttribute('data-due-status', 'none');

    await expect(
      taskCard.getByText('Просрочено', {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(taskCard).not.toContainText('Срок:');
  });
});
