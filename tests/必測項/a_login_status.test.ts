import { test, expect } from '@playwright/test';

test('一般登入', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  
  //await page.getByPlaceholder('請輸入密碼').fill('2222bright'); 
  await page.locator('#password').fill('2222bright');
  await page.locator('#password').press('Tab');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); // 暫停 輸入驗證碼

  await page.getByRole('button', { name: '登入' }).click();
  
  await page.waitForTimeout(5000); 
  await page.context().storageState({path:'auth.json'}); //保存登入狀態json
});
