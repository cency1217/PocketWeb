import { test, expect } from '@playwright/test';
import { webca } from '../../utils/webca'
import { getUser } from '../../utils/getUser'
import { genPwd } from '../../utils/genPwd'

test.use({ storageState:'webca.json'});

test('(登入)密碼變更', async ({ page }) => {
  test.slow(); 
  await webca(page);
  await page.goto('');
  await page.locator('a').filter({ hasText: '個人服務' }).hover();
  await page.locator('#mainSection').getByRole('link', { name: '密碼變更' }).click();

  const { USERNAME , PASSWORD } = await getUser(page);
  await page.getByPlaceholder('請輸入舊/補發密碼').fill(PASSWORD); 
  const { newPwd } = genPwd();
  await page.getByPlaceholder('請輸入新密碼').fill(newPwd); 
  await page.getByPlaceholder('請再次輸入新密碼').fill('');
  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '前往首頁' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill('');
  await page.locator('#password').fill(''); //新密碼
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.getByRole('button', { name: '登入' }).click();

});