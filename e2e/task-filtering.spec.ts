import { expect, test, type Locator, type Page } from '@playwright/test';

const DEFAULT_BOARD_TITLE = 'Kanban Board';

const FILTER_BOARD_TITLE = 'Доска для фильтров';

const TASK_COLUMN_TITLE = 'Backlog';

const REPORT_TASK = {
  title: 'Подготовить отчёт',
  description: 'Собрать данные за июль',
  priority: 'high',
  tags: ['Работа', 'Отчёт'],
} as const;

const COFFEE_TASK = {
  title: 'Купить кофе',
  description: 'Зайти в магазин после работы',
  priority: 'low',
  tags: ['Личное'],
} as const;

const DOCUMENTATION_TASK = {
  title: 'Обновить документацию',
  description: 'Описать работу drag and drop',
  priority: 'medium',
  tags: ['Работа', 'Документация'],
} as const;

type TaskData = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tags: readonly string[];
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

function getSearchInput(page: Page): Locator {
  return page.getByRole('searchbox', {
    name: 'Поиск',
  });
}

function getPrioritySelect(page: Page): Locator {
  return page.getByRole('combobox', {
    name: 'Приоритет',
  });
}

function getTagSelect(page: Page): Locator {
  return page.getByRole('combobox', {
    name: 'Тег',
  });
}

function getSortSelect(page: Page): Locator {
  return page.getByRole('combobox', {
    name: 'Сортировка',
  });
}

function getResetButton(page: Page): Locator {
  return page.getByRole('button', {
    name: 'Сбросить',
    exact: true,
  });
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

function getTask(page: Page, taskTitle: string): Locator {
  return page.getByText(taskTitle, {
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
  });

  await expect(dialog).toBeVisible();

  await dialog
    .getByRole('textbox', {
      name: 'Название',
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

  await expect(getBoardSelect(page)).toHaveValue(
    (await getBoardSelect(page).locator('option:checked').getAttribute('value')) || '',
  );

  await expect(getBoardSelect(page).locator('option:checked')).toHaveText(title);
}

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(getBoardSelect(page)).toBeVisible();

  await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

  await createBoard(page, FILTER_BOARD_TITLE);

  await expect(getSearchInput(page)).toBeVisible();
}

async function createTask(page: Page, columnTitle: string, task: TaskData) {
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
    .fill(task.title);

  await dialog
    .getByRole('textbox', {
      name: /описание/i,
    })
    .fill(task.description);

  await dialog
    .getByRole('combobox', {
      name: /приоритет/i,
    })
    .selectOption(task.priority);

  await dialog
    .getByRole('textbox', {
      name: /теги/i,
    })
    .fill(task.tags.join(', '));

  await dialog
    .getByRole('button', {
      name: 'Создать задачу',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(getTask(page, task.title)).toBeVisible();
}

async function createTestTasks(page: Page) {
  await createTask(page, TASK_COLUMN_TITLE, REPORT_TASK);

  await createTask(page, TASK_COLUMN_TITLE, COFFEE_TASK);

  await createTask(page, TASK_COLUMN_TITLE, DOCUMENTATION_TASK);

  await expect(
    page.getByText('Показано 3 из 3', {
      exact: true,
    }),
  ).toBeVisible();
}

async function expectTaskVisible(page: Page, title: string) {
  await expect(getTask(page, title)).toBeVisible();
}

async function expectTaskHidden(page: Page, title: string) {
  await expect(getTask(page, title)).toHaveCount(0);
}

async function expectTaskOrder(page: Page, expectedTitles: string[]) {
  const taskCards = getColumn(page, TASK_COLUMN_TITLE).locator('article');

  await expect(taskCards).toHaveCount(expectedTitles.length);

  for (const [index, expectedTitle] of expectedTitles.entries()) {
    await expect(taskCards.nth(index)).toContainText(expectedTitle);
  }
}

test.describe('Поиск и фильтрация задач', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('ищет задачу по названию', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('ОТЧЁТ');

    await expectTaskVisible(page, REPORT_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);

    await expectTaskHidden(page, DOCUMENTATION_TASK.title);

    await expect(
      page.getByText('Показано 1 из 3', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('ищет задачу по описанию', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('магазин');

    await expectTaskVisible(page, COFFEE_TASK.title);

    await expectTaskHidden(page, REPORT_TASK.title);

    await expectTaskHidden(page, DOCUMENTATION_TASK.title);
  });

  test('ищет задачу по тегу', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('документация');

    await expectTaskVisible(page, DOCUMENTATION_TASK.title);

    await expectTaskHidden(page, REPORT_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);
  });

  test('фильтрует задачи по приоритету', async ({ page }) => {
    await createTestTasks(page);

    await getPrioritySelect(page).selectOption('high');

    await expect(getPrioritySelect(page)).toHaveValue('high');

    await expectTaskVisible(page, REPORT_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);

    await expectTaskHidden(page, DOCUMENTATION_TASK.title);

    await expect(
      page.getByText('Показано 1 из 3', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('фильтрует задачи по выбранному тегу', async ({ page }) => {
    await createTestTasks(page);

    await getTagSelect(page).selectOption({
      label: 'Работа',
    });

    await expect(getTagSelect(page)).toHaveValue('Работа');

    await expectTaskVisible(page, REPORT_TASK.title);

    await expectTaskVisible(page, DOCUMENTATION_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);

    await expect(
      page.getByText('Показано 2 из 3', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('одновременно применяет несколько фильтров', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('работа');

    await getPrioritySelect(page).selectOption('medium');

    await getTagSelect(page).selectOption({
      label: 'Документация',
    });

    await expectTaskVisible(page, DOCUMENTATION_TASK.title);

    await expectTaskHidden(page, REPORT_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);
  });

  test('сортирует задачи по названию', async ({ page }) => {
    await createTestTasks(page);

    await getSortSelect(page).selectOption('title-asc');

    await expect(getSortSelect(page)).toHaveValue('title-asc');

    await expectTaskOrder(page, [COFFEE_TASK.title, DOCUMENTATION_TASK.title, REPORT_TASK.title]);
  });

  test('сортирует задачи по убыванию приоритета', async ({ page }) => {
    await createTestTasks(page);

    await getSortSelect(page).selectOption('priority-desc');

    await expectTaskOrder(page, [REPORT_TASK.title, DOCUMENTATION_TASK.title, COFFEE_TASK.title]);
  });

  test('показывает сообщение при отсутствии результатов', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('несуществующая задача');

    await expectTaskHidden(page, REPORT_TASK.title);

    await expectTaskHidden(page, COFFEE_TASK.title);

    await expectTaskHidden(page, DOCUMENTATION_TASK.title);

    await expect(
      page
        .getByText('Нет подходящих задач', {
          exact: true,
        })
        .first(),
    ).toBeVisible();

    await expect(
      page.getByText('Показано 0 из 3', {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('отключает перетаскивание при изменённом представлении', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('отчёт');

    await expect(
      page.getByText(
        /Перетаскивание задач доступно только при ручном порядке без активных фильтров/i,
      ),
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: `Переместить задачу «${REPORT_TASK.title}»`,
        exact: true,
      }),
    ).toBeDisabled();
  });

  test('сбрасывает параметры представления', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('работа');

    await getPrioritySelect(page).selectOption('high');

    await getTagSelect(page).selectOption({
      label: 'Работа',
    });

    await getSortSelect(page).selectOption('newest');

    await expect(getResetButton(page)).toBeEnabled();

    await getResetButton(page).click();

    await expect(getSearchInput(page)).toHaveValue('');

    await expect(getPrioritySelect(page)).toHaveValue('all');

    await expect(getTagSelect(page)).toHaveValue('');

    await expect(getSortSelect(page)).toHaveValue('manual');

    await expectTaskVisible(page, REPORT_TASK.title);

    await expectTaskVisible(page, COFFEE_TASK.title);

    await expectTaskVisible(page, DOCUMENTATION_TASK.title);

    await expect(
      page.getByText('Показано 3 из 3', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(getResetButton(page)).toBeDisabled();
  });

  test('сбрасывает фильтры при переключении доски', async ({ page }) => {
    await createTestTasks(page);

    await getSearchInput(page).fill('отчёт');

    await getPrioritySelect(page).selectOption('high');

    await getSortSelect(page).selectOption('newest');

    await expect(getResetButton(page)).toBeEnabled();

    await getBoardSelect(page).selectOption({
      label: DEFAULT_BOARD_TITLE,
    });

    await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

    await expect(getSearchInput(page)).toHaveValue('');

    await expect(getPrioritySelect(page)).toHaveValue('all');

    await expect(getTagSelect(page)).toHaveValue('');

    await expect(getSortSelect(page)).toHaveValue('manual');

    await expect(getResetButton(page)).toBeDisabled();
  });
});
