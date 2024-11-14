import { test, expect } from '@playwright/test';

test.use({ storageState:'auth.json'}); //使用登入狀態及憑證
test.use({ storageState:'webca.json'});

test('test', async ({ page }) => {
  await page.goto('https://www.pocket.tw/piggybank/');
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('textbox', { name: '請輸入標的名稱或代號' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('textbox', { name: '請輸入標的名稱或代號' }).fill('0050');
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByText('元大台灣50').click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '定股' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('textbox', { name: '1~' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('textbox', { name: '1~' }).fill('1');
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '+新增委託日期' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '2', exact: true }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '確認' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '下一步' }).click();
  await page.locator('iframe[name="piggy_bank_AMT"]').contentFrame().getByRole('button', { name: '確認' }).click();

});
