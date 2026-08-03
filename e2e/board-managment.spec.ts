import { expect, test, type Locator, type Page } from '@playwright/test';

const DEFAULT_BOARD_TITLE = 'Kanban Board';

const SECOND_BOARD_TITLE = 'Рабочая доска';
const RENAMED_BOARD_TITLE = 'Рабочие задачи';

const TASK_TITLE = 'Подготовить отчёт';

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(
    page.getByRole('combobox', {
      name: 'Доска',
    }),
  ).toBeVisible();

  await expectActiveBoardTitle(page, DEFAULT_BOARD_TITLE);
}

function getBoardSelect(page: Page): Locator {
  return getBoardToolbar(page).getByRole('combobox', {
    name: 'Доска',
  });
}

function getBoardToolbar(page: Page): Locator {
  return page.getByRole('toolbar', {
    name: 'Управление досками',
  });
}

function getSelectedBoardOption(page: Page): Locator {
  return getBoardSelect(page).locator('option:checked');
}

function getActiveBoardHeading(page: Page): Locator {
  return page.locator('#board-title');
}

function getEmptyBoardHeading(page: Page): Locator {
  return page.locator('#empty-board-title');
}

async function expectActiveBoardTitle(page: Page, title: string) {
  const heading = getActiveBoardHeading(page);

  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(title);
}

function getColumn(page: Page, columnTitle: string): Locator {
  const heading = page.getByRole('heading', {
    name: columnTitle,
    exact: true,
  });

  return heading.locator('xpath=ancestor::section[1]');
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

  await expectActiveBoardTitle(page, title);

  await expect(getSelectedBoardOption(page)).toHaveText(title);
}

async function renameActiveBoard(page: Page, title: string) {
  await getBoardToolbar(page)
    .getByRole('button', {
      name: 'Переименовать',
      exact: true,
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Переименование доски',
  });

  await expect(dialog).toBeVisible();

  const titleInput = dialog.getByRole('textbox', {
    name: 'Название',
  });

  await expect(titleInput).toBeVisible();

  await titleInput.clear();
  await titleInput.fill(title);

  await dialog
    .getByRole('button', {
      name: 'Сохранить',
      exact: true,
    })
    .click();

  await expect(dialog).toBeHidden();

  await expectActiveBoardTitle(page, title);
}

async function createTask(page: Page, columnTitle: string, taskTitle: string) {
  const column = getColumn(page, columnTitle);

  await expect(column).toBeVisible();

  await column
    .getByRole('button', {
      name: /создать|добавить/i,
    })
    .click();

  const dialog = page.getByRole('dialog');

  await expect(dialog).toBeVisible();

  await expect(
    dialog.getByRole('heading', {
      name: 'Новая задача',
    }),
  ).toBeVisible();

  await dialog
    .getByRole('textbox', {
      name: /название|заголовок/i,
    })
    .fill(taskTitle);

  await dialog
    .getByRole('button', {
      name: 'Создать задачу',
    })
    .click();

  await expect(dialog).toBeHidden();

  await expect(
    page.getByText(taskTitle, {
      exact: true,
    }),
  ).toBeVisible();
}

async function deleteActiveBoard(page: Page, expectedBoardTitle: string) {
  const deleteButton = getBoardToolbar(page).getByRole('button', {
    name: 'Удалить',
    exact: true,
  });

  await expect(deleteButton).toBeEnabled();

  let receivedDialogType: string | null = null;

  let receivedDialogMessage: string | null = null;

  page.once('dialog', async (dialog) => {
    receivedDialogType = dialog.type();
    receivedDialogMessage = dialog.message();

    await dialog.accept();
  });

  await deleteButton.click();

  expect(receivedDialogType).toBe('confirm');

  expect(receivedDialogMessage).toContain(expectedBoardTitle);
}

test.describe('Управление несколькими досками', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('создаёт новую доску с четырьмя стандартными колонками', async ({ page }) => {
    await createBoard(page, SECOND_BOARD_TITLE);

    await expect(getSelectedBoardOption(page)).toHaveText(SECOND_BOARD_TITLE);

    for (const columnTitle of ['Backlog', 'To do', 'In progress', 'Done']) {
      await expect(
        page.getByRole('heading', {
          name: columnTitle,
          exact: true,
        }),
      ).toBeVisible();
    }
  });

  test('переключается между досками и показывает только их задачи', async ({ page }) => {
    await createBoard(page, SECOND_BOARD_TITLE);

    await createTask(page, 'Backlog', TASK_TITLE);

    const boardSelect = getBoardSelect(page);

    await boardSelect.selectOption({
      label: DEFAULT_BOARD_TITLE,
    });

    await expectActiveBoardTitle(page, DEFAULT_BOARD_TITLE);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);

    await boardSelect.selectOption({
      label: SECOND_BOARD_TITLE,
    });

    await expectActiveBoardTitle(page, SECOND_BOARD_TITLE);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toBeVisible();
  });

  test('переименовывает активную доску', async ({ page }) => {
    await createBoard(page, SECOND_BOARD_TITLE);

    await renameActiveBoard(page, RENAMED_BOARD_TITLE);

    await expect(getSelectedBoardOption(page)).toHaveText(RENAMED_BOARD_TITLE);

    await expect(
      page.getByRole('option', {
        name: SECOND_BOARD_TITLE,
      }),
    ).toHaveCount(0);

    await expect(
      page.getByRole('option', {
        name: RENAMED_BOARD_TITLE,
      }),
    ).toBeAttached();
  });

  test('удаляет доску вместе с её задачами', async ({ page }) => {
    await createBoard(page, SECOND_BOARD_TITLE);

    await createTask(page, 'Backlog', TASK_TITLE);

    await deleteActiveBoard(page, SECOND_BOARD_TITLE);

    await expectActiveBoardTitle(page, DEFAULT_BOARD_TITLE);

    await expect(getSelectedBoardOption(page)).toHaveText(DEFAULT_BOARD_TITLE);

    await expect(
      page.getByRole('option', {
        name: SECOND_BOARD_TITLE,
      }),
    ).toHaveCount(0);

    await expect(
      page.getByText(TASK_TITLE, {
        exact: true,
      }),
    ).toHaveCount(0);
  });

  test('сохраняет активную доску после перезагрузки', async ({ page }) => {
    await createBoard(page, SECOND_BOARD_TITLE);

    await expect(getSelectedBoardOption(page)).toHaveText(SECOND_BOARD_TITLE);

    await page.reload();

    await expectActiveBoardTitle(page, SECOND_BOARD_TITLE);

    await expect(getSelectedBoardOption(page)).toHaveText(SECOND_BOARD_TITLE);

    await expect(
      page.getByRole('option', {
        name: DEFAULT_BOARD_TITLE,
      }),
    ).toBeAttached();

    await expect(
      page.getByRole('option', {
        name: SECOND_BOARD_TITLE,
      }),
    ).toBeAttached();
  });

  test('показывает пустое состояние после удаления последней доски', async ({ page }) => {
    await deleteActiveBoard(page, DEFAULT_BOARD_TITLE);

    await expect(getEmptyBoardHeading(page)).toBeVisible();

    await expect(getEmptyBoardHeading(page)).toHaveText('Пока нет досок');

    await expect(
      page.getByText('Создай первую доску, чтобы начать работу с задачами.'),
    ).toBeVisible();

    await expect(getBoardSelect(page)).toBeDisabled();

    await expect(
      page.getByRole('button', {
        name: 'Переименовать',
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole('button', {
        name: 'Удалить',
      }),
    ).toBeDisabled();

    await expect(
      page.getByRole('button', {
        name: 'Создать доску',
      }),
    ).toBeEnabled();
  });

  test('создаёт доску из пустого состояния', async ({ page }) => {
    await deleteActiveBoard(page, DEFAULT_BOARD_TITLE);

    await page
      .getByRole('button', {
        name: 'Создать доску',
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
      .fill(SECOND_BOARD_TITLE);

    await dialog
      .getByRole('button', {
        name: 'Создать',
      })
      .click();

    await expectActiveBoardTitle(page, SECOND_BOARD_TITLE);

    await expect(getBoardSelect(page)).toBeEnabled();

    await expect(getSelectedBoardOption(page)).toHaveText(SECOND_BOARD_TITLE);
  });
});
