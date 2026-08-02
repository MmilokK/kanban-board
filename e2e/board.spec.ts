import { expect, test } from '@playwright/test';

test('создаёт задачу и сохраняет её после перезагрузки', async ({ page }) => {
  await page.goto('/');

  /*
   * Удаляем данные от ручной разработки,
   * затем загружаем приложение заново.
   */
  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  const todoColumn = page.getByRole('region', {
    name: 'To do',
  });

  await todoColumn
    .getByRole('button', {
      name: 'Добавить задачу',
    })
    .click();

  const dialog = page.getByRole('dialog', {
    name: 'Новая задача',
  });

  await dialog.getByLabel('Название').fill('E2E задача');

  await dialog.getByLabel('Описание').fill('Проверить сохранение после перезагрузки');

  await dialog.getByLabel('Приоритет').selectOption('high');

  await dialog.getByLabel('Теги').fill('Playwright, Testing');

  await dialog
    .getByRole('button', {
      name: 'Создать задачу',
    })
    .click();

  await expect(
    todoColumn.getByRole('heading', {
      name: 'E2E задача',
    }),
  ).toBeVisible();

  await page.reload();

  const reloadedTodoColumn = page.getByRole('region', {
    name: 'To do',
  });

  await expect(
    reloadedTodoColumn.getByRole('heading', {
      name: 'E2E задача',
    }),
  ).toBeVisible();
});

test('мигрирует сохраненную доску версии 1', async ({ page }) => {
  const legacyPersistedState = {
    state: {
      tasks: {
        'legacy-task': {
          id: 'legacy-task',
          title: 'Task from v1',
          description: 'Saved before migration',
          priority: 'high',
          tags: ['migration'],
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z',
        },
      },

      columns: {
        backlog: {
          id: 'backlog',
          title: 'Backlog',
          taskIds: ['legacy-task'],
        },

        todo: {
          id: 'todo',
          title: 'To do',
          taskIds: [],
        },

        'in-progress': {
          id: 'in-progress',
          title: 'In progress',
          taskIds: [],
        },

        done: {
          id: 'done',
          title: 'Done',
          taskIds: [],
        },
      },

      columnOrder: ['backlog', 'todo', 'in-progress', 'done'],

      schemaVersion: 1,
    },

    version: 1,
  };

  await page.addInitScript(
    ({ storageKey, value }) => {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    },
    {
      storageKey: 'kanban-board-storage',
      value: legacyPersistedState,
    },
  );

  await page.goto('/');

  await expect(page.getByText('Task from v1')).toBeVisible();

  await page.reload();

  await expect(page.getByText('Task from v1')).toBeVisible();
});
