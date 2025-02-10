import { test, expect } from '@playwright/test';

test('帳號/密碼/驗證碼輸入錯誤提示', async ({ page }) => {
  test.slow();
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.locator('#password').press('Tab');
  await page.locator('#password').fill('a12345678');
  await expect(page.locator('#password')).toHaveAttribute('type','password');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await expect(page.getByText('* 帳號或密碼有誤，請再次確認')).toBeVisible();
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790713');
  await page.locator('#password').fill('1111bright');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).clear();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await expect(page.getByText('* 帳號或密碼有誤，請再次確認')).toBeVisible();
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('B222790712');
  await page.locator('#password').press('Tab');
  await page.locator('#password').fill('1111bright');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).clear();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill('11111'); //輸入錯誤驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await expect(page.getByText('* 驗證碼輸入錯誤')).toBeVisible();
  await page.locator('#homepagebg path').first().click();
  await expect(page.locator('#password')).toHaveAttribute('type','text');
});