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
