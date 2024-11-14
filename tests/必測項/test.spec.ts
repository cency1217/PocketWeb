import { test, expect } from '@playwright/test';

test('帳號/密碼/驗證碼輸入錯誤提示', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  const img1 = getByRole('img', { name: 'captchaImage' });
  await page.getByRole('button', { name: '' }).click(); //刷新驗證碼 
  //抓取圖片src 預期點擊刷新後 src會變更
});