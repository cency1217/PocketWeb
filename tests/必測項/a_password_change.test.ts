import { test, expect } from '@playwright/test';

//使用登入狀態
test.use({ storageState:'auth.json'});

test('(登入)密碼變更', async ({ page }) => {
  test.slow(); 
  await page.goto('https://www.pocket.tw/');
  await page.locator('a').filter({ hasText: '個人服務' }).hover(); //懸停 
  await page.locator('#mainSection').getByRole('link', { name: '密碼變更' }).click();
  await page.getByPlaceholder('請輸入舊/補發密碼').fill('9999bright'); 
  await page.getByPlaceholder('請輸入新密碼').fill('1111bright'); //修改密碼
  await page.getByPlaceholder('請再次輸入新密碼').fill('1111bright');
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '前往首頁' }).click();
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.locator('#password').fill('1111bright'); //新密碼
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.getByRole('button', { name: '登入' }).click();
  await page.waitForTimeout(10000); 
});