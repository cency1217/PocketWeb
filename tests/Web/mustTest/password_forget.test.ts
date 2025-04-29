import { test, expect } from '@playwright/test';
import { webca } from '@utils/auth/webca';
import { getUser } from '@utils/auth/getUser';
import { genPwd } from '@utils/helper/genPwd';
import { getCaptcha } from '@utils/captcha/getCaptcha';

test.use({ storageState:'./utils/auth/webca.json'});//使用登入狀態

test('pwd_forget_with_webca', async ({ page }) => {
  const { USERNAME , PASSWORD , BIRTHDAY } = await getUser(page);
  test.slow(); //延長測試時間三倍 因收驗證簡訊需較久的操作
  await page.goto('');
  await page.getByRole('button', { name: '登出' }).click();

  await page.locator('#homepagebg').getByText('忘記密碼').click();
  await page.getByRole('link', { name: '密碼補發' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.getByPlaceholder('年 / 月 / 日').fill(BIRTHDAY);
  await page.getByRole('button', { name: '確認' }).click();

  await page.locator('div').filter({ hasText: '發送驗證碼' }).nth(4).click();
  await page.locator('section').filter({ hasText: '簡訊驗證碼發送已成功發送至手機，請在五分鐘內輸入該密碼避免失效' }).getByRole('button').click();
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
  await page.waitForTimeout(20000);

  await page.getByRole('button', { name: '確認' }).click();
  await page.getByRole('button', { name: '密碼變更' }).click();

  const newPwd = genPwd();
  await page.getByPlaceholder('請輸入新密碼').fill('newPwd'); //輸入新密碼
  await page.getByPlaceholder('請再次輸入新密碼').fill('newPwd'); //再次輸入新密碼

  const ocrSuccess = await getCaptcha(page);
  if (!ocrSuccess) {
      throw new Error('驗證碼辨識失敗');
  }

  await page.getByRole('button', { name: '前往首頁' }).click();

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(newPwd);

  // 暫停 輸入驗證碼
  await page.waitForTimeout(10000); 

  const ocrSuccess_login = await getCaptcha(page);
  if (!ocrSuccess_login) {
      throw new Error('驗證碼辨識失敗');
  }
  
  await page.waitForTimeout(3000); 
  await page.context().storageState({path:'./utils/auth/auth.json'});
});