import { test, expect } from '@playwright/test';
import { getUser } from '@utils/auth/getUser';
import { getCaptcha } from '@utils/auth/getCaptcha';

test('pwd_unlock', async ({ page }) => {
  test.slow();

  const { USERNAME , PASSWORD , BIRTHDAY } = await getUser(page);
  await page.goto('');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('USERNAME');
  await page.locator('#password').fill('a12345678');//輸入錯誤密碼
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await expect(page.getByRole('link', { name: '密碼鎖定' })).toBeVisible();
  await page.getByRole('link', { name: '密碼解鎖' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('USERNAME');
  await page.getByPlaceholder('年 / 月 / 日').fill('1997/05/22');
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '發送驗證碼' }).click();
  await page.locator('section').filter({ hasText: '簡訊驗證碼發送已成功發送至手機，請在五分鐘內輸入該密碼避免失效' }).getByRole('button').click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(20000); //暫停輸入簡訊驗證碼
  await page.getByRole('button', { name: '確認' }).click();
  await page.locator('div').filter({ hasText: /^確認$/ }).getByRole('button').click();
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(''); //正確密碼
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('button', { name: '關閉' }).click();
});