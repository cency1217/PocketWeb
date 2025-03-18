import { test, expect } from '@playwright/test';
import { webca } from '@utils/auth/webca'
import { getUser } from '@utils/auth/getUser'
import { getCaptcha } from '@utils/captcha/getCaptcha'
import { genPwd } from '@utils/helper/genPwd'

test.use({ storageState:'webca.json'});

test('pwd_change', async ({ page }) => {
  test.slow(); 
  await webca(page);
  await page.goto('account/settings/modify/');

  const { USERNAME , PASSWORD } = await getUser(page);
  await page.getByPlaceholder('請輸入舊/補發密碼').fill(PASSWORD); 
  const newPwd = genPwd();
  await page.getByPlaceholder('請輸入新密碼').fill(newPwd); 
  await page.getByPlaceholder('請再次輸入新密碼').fill(newPwd);

  const ocrSuccess = await getCaptcha(page);
  if (!ocrSuccess) {
      throw new Error('驗證碼辨識失敗');
  }

  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '前往首頁' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(newPwd); // 使用新密碼登入

  const ocrSuccess1 = await getCaptcha(page);
  if (!ocrSuccess1) {
      throw new Error('驗證碼辨識失敗');
  }

  await page.getByRole('button', { name: '登入' }).click();

  // 將新密碼寫入 .env 檔案
  await import('@utils/helper/envWrite').then(({ updateEnvFile }) => {
    updateEnvFile('password', newPwd);
  });

});