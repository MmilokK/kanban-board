import { expect, test } from '@playwright/test';

test.describe('PWA', () => {
  test('подключает web manifest', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });

  test('регистрирует service worker', async ({ page }) => {
    await page.goto('/');

    const active = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) {
        return false;
      }

      const registration = await navigator.serviceWorker.ready;

      return Boolean(registration.active);
    });

    expect(active).toBe(true);
  });

  test('загружает приложение без сети после установки service worker', async ({
    page,
    context,
  }) => {
    await page.goto('/');

    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });

    await page.reload();

    await context.setOffline(true);

    try {
      await page.reload();

      await expect(page.locator('#board-title')).toHaveText('Kanban Board');
    } finally {
      await context.setOffline(false);
    }
  });
});
