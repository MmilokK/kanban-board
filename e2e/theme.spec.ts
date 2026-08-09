import { expect, test, type Page } from '@playwright/test';

const THEME_STORAGE_KEY = 'kanban-board-theme';

async function resetApplication(page: Page) {
  await page.goto('/');

  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.reload();

  await expect(
    page.getByRole('combobox', {
      name: 'Тема',
    }),
  ).toBeVisible();
}

function getThemeSelect(page: Page) {
  return page.getByRole('combobox', {
    name: 'Тема',
  });
}

test.describe('Тема интерфейса', () => {
  test.beforeEach(async ({ page }) => {
    await resetApplication(page);
  });

  test('использует системную тему по умолчанию', async ({ page }) => {
    await expect(getThemeSelect(page)).toHaveValue('system');
  });

  test('переключает интерфейс на тёмную тему', async ({ page }) => {
    await getThemeSelect(page).selectOption('dark');

    await expect(getThemeSelect(page)).toHaveValue('dark');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('переключает интерфейс на светлую тему', async ({ page }) => {
    await getThemeSelect(page).selectOption('dark');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await getThemeSelect(page).selectOption('light');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('сохраняет выбранную тему после перезагрузки', async ({ page }) => {
    await getThemeSelect(page).selectOption('dark');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();

    await expect(getThemeSelect(page)).toHaveValue('dark');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('сохраняет настройку темы в localStorage', async ({ page }) => {
    await getThemeSelect(page).selectOption('dark');

    const storedTheme = await page.evaluate(
      (storageKey) => window.localStorage.getItem(storageKey),
      THEME_STORAGE_KEY,
    );

    expect(storedTheme).toBe('dark');
  });

  test('применяет сохранённую тему при загрузке', async ({ page }) => {
    await page.evaluate(
      ({ storageKey, theme }) => {
        window.localStorage.setItem(storageKey, theme);
      },
      {
        storageKey: THEME_STORAGE_KEY,
        theme: 'dark',
      },
    );

    await page.reload();

    await expect(getThemeSelect(page)).toHaveValue('dark');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('использует тёмную системную тему', async ({ page }) => {
    await page.emulateMedia({
      colorScheme: 'dark',
    });

    await getThemeSelect(page).selectOption('system');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('использует светлую системную тему', async ({ page }) => {
    await page.emulateMedia({
      colorScheme: 'light',
    });

    await getThemeSelect(page).selectOption('system');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('реагирует на изменение системной темы', async ({ page }) => {
    await page.emulateMedia({
      colorScheme: 'light',
    });

    await getThemeSelect(page).selectOption('system');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.emulateMedia({
      colorScheme: 'dark',
    });

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
