import { test, expect } from '@playwright/test';

test('normal_login', async ({ page }) => {
  test.slow();
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.locator('#password').fill('8888bright');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); // 暫停 輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('button', { name: '關閉' }).click();//誤入款
  await page.getByRole('button', { name: '關閉' }).click();//安心下單兩步驟
  await expect(page.getByRole('button', { name: '登出' })).toBeVisible();
  
  await page.waitForTimeout(5000); 
  await page.context().storageState({path:'auth.json'}); //保存登入狀態json00000
});
