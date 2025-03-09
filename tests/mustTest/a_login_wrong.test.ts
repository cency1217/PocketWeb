import { test, expect } from '@playwright/test';
import { getUser } from '../../utils/getUser'
import { genPwd } from '../../utils/genPwd'

test('pwd_wrong_hint', async ({ page }) => {
  test.slow();

  const {USERNAME} = await getUser(page);

  await page.goto('');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(genPwd());
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();

  //暫停輸入驗證碼
  await page.waitForTimeout(7000); 
  await page.getByRole('button', { name: '登入' }).click();

  //驗證
  await expect(page.getByText('* 帳號或密碼有誤，請再次確認')).toBeVisible();
});


test('id_wrong_hint', async ({ page }) => {
  test.slow();

  await page.goto('');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('A000000000');
  await page.locator('#password').fill('z12345678');
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).clear();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();

  //暫停輸入驗證碼
  await page.waitForTimeout(7000); 
  await page.getByRole('button', { name: '登入' }).click();

  //驗證
  await expect(page.getByText('* 帳號或密碼有誤，請再次確認')).toBeVisible();
});


test('captcha_wrong_hint', async ({ page }) => {
  test.slow();
  const { USERNAME , PASSWORD } = await getUser(page);

  await page.goto('');
  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).clear();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill('11111'); //輸入錯誤驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  
  await expect(page.getByText('* 驗證碼輸入錯誤')).toBeVisible();
});