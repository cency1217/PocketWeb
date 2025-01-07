import { test, expect } from '@playwright/test';

//使用登入狀態
test.use({ storageState:'auth.json'});

test('test', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  await page.locator('#carouselFunctionButton').getByRole('link', { name: '口袋存股' }).click();
  await page.getByRole('link', { name: 'ETF專區', exact: true });
  await expect(page.getByText('ETF專區台股ETF美股ETF')).toBeVisible();
  await expect(page.getByRole('link', { name: '熱門排行' })).toBeVisible();
  await page.getByRole('link', { name: 'ETF專區', exact: true });
});