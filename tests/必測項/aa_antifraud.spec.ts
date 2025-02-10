import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  const page2Promise = page.waitForEvent('popup');
  await page.locator('#antiFraudBar').getByRole('link', { name: '反詐騙專區' }).click();
  const page2 = await page2Promise;
  await page2.goto('https://www.pocket.tw/EDM/anti_fraud/index.htm');
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '查看詳情' }).click();
  const page3 = await page3Promise;
  await page3.goto('https://www.pocket.tw/EDM/anti_fraud/index.htm');
});