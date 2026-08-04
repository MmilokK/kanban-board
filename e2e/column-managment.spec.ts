import { expect, test, type Locator, type Page } from '@playwright/test';

const DEFAULT_BOARD_TITLE = 'Kanban Board';

const DEFAULT_COLUMN_TITLES = ['Backlog', 'To do', 'In progress', 'Done'] as const;

const CREATED_COLUMN_TITLE = 'Проверка';
const RENAMED_COLUMN_TITLE = 'Тестирование';

const TASK_TITLE = 'Проверить новую колонку';

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

  await expect(
    page.getByRole('button', {
      name: 'Новая колонка',
      exact: true,
    }),
  ).toBeVisible();
}

function getColumnHeadings(page: Page): Locator {
  return page.locator('h2[id^="column-"][id$="-title"]');
}

function getColumnHeading(page: Page, columnTitle: string): Locator {
  return getColumnHeadings(page).filter({
    hasText: columnTitle,
  });
}

function getColumn(page: Page, columnTitle: string): Locator {
  return getColumnHeading(page, columnTitle).locator('xpath=ancestor::section[1]');
}

function getColumnDialog(
  page: Page,
  dialogTitle: 'Новая колонка' | 'Переименование колонки',
): Locator {
  return page.getByRole('dialog', {
    name: dialogTitle,
  });
}

async function expectColumnOrder(page: Page, expectedTitles: string[]) {
  await expect(getColumnHeadings(page)).toHaveText(expectedTitles);
}

async function createColumn(page: Page, title: string) {
  await page
    .getByRole('button', {
      name: 'Новая колонка',
      exact: true,
    })
    .click();

  const dialog = getColumnDialog(page, 'Новая колонка');

  await expect(dialog).toBeVisible();

  const titleInput = dialog.getByRole('textbox', {
    name: 'Название',
  });

  await expect(titleInput).toBeVisible();

  await titleInput.fill(title);

  await dialog
    .getByRole('button', {
      name: 'Создать',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(getColumnHeading(page, title)).toBeVisible();
}

async function renameColumn(page: Page, currentTitle: string, nextTitle: string) {
  await page
    .getByRole('button', {
      name: `Переименовать колонку ${currentTitle}`,
      exact: true,
    })
    .click();

  const dialog = getColumnDialog(page, 'Переименование колонки');

  await expect(dialog).toBeVisible();

  const titleInput = dialog.getByRole('textbox', {
    name: 'Название',
  });

  await expect(titleInput).toHaveValue(currentTitle);

  await titleInput.clear();
  await titleInput.fill(nextTitle);

  await dialog
    .getByRole('button', {
      name: 'Сохранить',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(getColumnHeading(page, currentTitle)).toHaveCount(0);

  await expect(getColumnHeading(page, nextTitle)).toBeVisible();
}

async function confirmAction(page: Page, action: () => Promise<void>, expectedMessage: string) {
  await Promise.all([
    page.waitForEvent('dialog').then(async (dialog) => {
      expect(dialog.type()).toBe('confirm');

      expect(dialog.message()).toContain(expectedMessage);

      await dialog.accept();
    }),

    action(),
  ]);
}

async function deleteColumn(page: Page, columnTitle: string) {
  const deleteButton = page.getByRole('button', {
    name: `Удалить колонку ${columnTitle}`,
    exact: true,
  });

  await expect(deleteButton).toBeEnabled();

  await confirmAction(
    page,
    async () => {
      await deleteButton.click();
    },
    columnTitle,
  );

  await expect(getColumnHeading(page, columnTitle)).toHaveCount(0);
}

async function createTask(page: Page, columnTitle: string, taskTitle: string) {
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
    .fill(taskTitle);

  await dialog
    .getByRole('button', {
      name: 'Создать задачу',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(
    page.getByText(taskTitle, {
      exact: true,
    }),
  ).toBeVisible();
}

test.describe('Управление колонками', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('создаёт новую колонку в конце доски', async ({ page }) => {
    await createColumn(page, CREATED_COLUMN_TITLE);

    await expectColumnOrder(page, [...DEFAULT_COLUMN_TITLES, CREATED_COLUMN_TITLE]);

    const createdColumn = getColumn(page, CREATED_COLUMN_TITLE);

    await expect(createdColumn).toBeVisible();

    await expect(
      createdColumn.getByText(CREATED_COLUMN_TITLE, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('переименовывает колонку', async ({ page }) => {
    await createColumn(page, CREATED_COLUMN_TITLE);

    await renameColumn(page, CREATED_COLUMN_TITLE, RENAMED_COLUMN_TITLE);

    await expectColumnOrder(page, [...DEFAULT_COLUMN_TITLES, RENAMED_COLUMN_TITLE]);

    await expect(
      page.getByRole('button', {
        name: `Переименовать колонку ${RENAMED_COLUMN_TITLE}`,
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: `Переименовать колонку ${CREATED_COLUMN_TITLE}`,
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('перемещает колонку влево', async ({ page }) => {
    await createColumn(page, CREATED_COLUMN_TITLE);

    await page
      .getByRole('button', {
        name: `Переместить колонку ${CREATED_COLUMN_TITLE} влево`,
        exact: true,
      })
      .click();

    await expectColumnOrder(page, [
      'Backlog',
      'To do',
      'In progress',
      CREATED_COLUMN_TITLE,
      'Done',
    ]);
  });

  test('перемещает колонку вправо', async ({ page }) => {
    await page
      .getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
        exact: true,
      })
      .click();

    await expectColumnOrder(page, ['To do', 'Backlog', 'In progress', 'Done']);
  });

  test('отключает перемещение для крайних колонок', async ({ page }) => {
    await expect(
      page.getByRole('button', {
        name: 'Переместить колонку Backlog влево',
        exact: true,
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole('button', {
        name: 'Переместить колонку Done вправо',
        exact: true,
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole('button', {
        name: 'Переместить колонку Backlog вправо',
        exact: true,
      }),
    ).toBeEnabled();

    await expect(
      page.getByRole('button', {
        name: 'Переместить колонку Done влево',
        exact: true,
      }),
    ).toBeEnabled();
  });

  test('удаляет пустую колонку', async ({ page }) => {
    await createColumn(page, CREATED_COLUMN_TITLE);

    await expect(getColumnHeading(page, CREATED_COLUMN_TITLE)).toBeVisible();

    await deleteColumn(page, CREATED_COLUMN_TITLE);

    await expectColumnOrder(page, [...DEFAULT_COLUMN_TITLES]);
  });

  test('удаляет колонку вместе с её задачами', async ({ page }) => {
    await createColumn(page, CREATED_COLUMN_TITLE);

    await createTask(page, CREATED_COLUMN_TITLE, TASK_TITLE);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();

    await deleteColumn(page, CREATED_COLUMN_TITLE);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);

    await expect(getColumnHeading(page, CREATED_COLUMN_TITLE)).toHaveCount(0);
  });

  test('показывает пустое состояние после удаления всех колонок', async ({ page }) => {
    for (const columnTitle of [...DEFAULT_COLUMN_TITLES]) {
      await deleteColumn(page, columnTitle);
    }

    await expect(
      page.getByRole('heading', {
        name: 'Пока нет колонок',
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByText('Добавь первую колонку, чтобы создавать задачи.', {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', {
        name: 'Создать колонку',
        exact: true,
      }),
    ).toBeEnabled();

    await expect(getColumnHeadings(page)).toHaveCount(0);
  });

  test('создаёт колонку из пустого состояния', async ({ page }) => {
    for (const columnTitle of [...DEFAULT_COLUMN_TITLES]) {
      await deleteColumn(page, columnTitle);
    }

    await page
      .getByRole('button', {
        name: 'Создать колонку',
        exact: true,
      })
      .click();

    const dialog = getColumnDialog(page, 'Новая колонка');

    await expect(dialog).toBeVisible();

    await dialog
      .getByRole('textbox', {
        name: 'Название',
      })
      .fill(CREATED_COLUMN_TITLE);

    await dialog
      .getByRole('button', {
        name: 'Создать',
        exact: true,
      })
      .click();

    await expect(dialog).toBeHidden();

    await expectColumnOrder(page, [CREATED_COLUMN_TITLE]);

    await expect(
      page.getByRole('heading', {
        name: 'Пока нет колонок',
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('сохраняет порядок колонок после перезагрузки', async ({ page }) => {
    await page
      .getByRole('button', {
        name: 'Переместить колонку Done влево',
        exact: true,
      })
      .click();

    await page
      .getByRole('button', {
        name: 'Переместить колонку Done влево',
        exact: true,
      })
      .click();

    await page
      .getByRole('button', {
        name: 'Переместить колонку Done влево',
        exact: true,
      })
      .click();

    const expectedOrder = ['Done', 'Backlog', 'To do', 'In progress'];

    await expectColumnOrder(page, expectedOrder);

    await page.reload();

    await expect(page.locator('#board-title')).toHaveText(DEFAULT_BOARD_TITLE);

    await expectColumnOrder(page, expectedOrder);
  });
});
