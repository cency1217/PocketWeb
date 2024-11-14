import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const response = await page.goto('https://www.pocket.tw/');
  expect (response.status()).toBe(200);
});