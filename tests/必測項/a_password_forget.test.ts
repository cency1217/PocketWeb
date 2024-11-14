import { test, expect } from '@playwright/test';

test.use({ storageState:'webca.json'});//使用登入狀態

test('忘記密碼＿有憑證', async ({ page }) => {
  test.slow(); //延長測試時間三倍 因收驗證簡訊需較久的操作
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('button', { name: '登出' }).click();
  await page.locator('#homepagebg').getByText('忘記密碼').click();
  await page.getByRole('link', { name: '密碼補發' }).click();
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.getByPlaceholder('年 / 月 / 日').fill('1997/05/22');
  await page.getByRole('button', { name: '確認' }).click();
  await page.locator('div').filter({ hasText: '發送驗證碼' }).nth(4).click();
  await page.locator('section').filter({ hasText: '簡訊驗證碼發送已成功發送至手機，請在五分鐘內輸入該密碼避免失效' }).getByRole('button').click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(20000);
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '密碼變更' }).click();
  await page.getByPlaceholder('請輸入新密碼').fill('1111bright'); //輸入新密碼
  await page.getByPlaceholder('請再次輸入新密碼').fill('1111bright'); //再次輸入新密碼
  await page.getByPlaceholder('請輸入驗證碼').click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '前往首頁' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.locator('#password').fill('1111bright');
  await page.locator('#password').press('Tab');
  await page.locator('#password').press('Tab');

  await page.pause(); // 暫停 輸入驗證碼
  await page.waitForTimeout(10000); 

  await page.getByRole('button', { name: '登入' }).click();
  
  await page.waitForTimeout(5000); 
  await page.context().storageState({path:'auth.json'});
});