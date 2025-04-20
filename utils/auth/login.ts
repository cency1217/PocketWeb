import { Page, test } from '@playwright/test';
import { getUser } from '@utils/auth/getUser';
import { getCaptcha } from '@utils/captcha/getCaptcha';
test.use({ storageState:'./utils/auth/auth.json'});

export async function login(page: Page) {
  //效能問題
  test.slow()
  const { USERNAME, PASSWORD } = await getUser(page);
  await page.goto('');

  const loginPrompt = await page.locator('#homepagebg').getByText('登入後提供更多服務').count();
    
  if (loginPrompt > 0) {
    console.log('需登入');
    await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
    await page.locator('#password').fill(PASSWORD);

    const ocrSuccess = await getCaptcha(page);
    if (!ocrSuccess) {
        throw new Error('驗證碼辨識失敗');
    }

    const errorMessage = await page.getByText('* 帳號或密碼有誤，請再次確認').count();
    if (errorMessage > 0) {
        throw new Error('帳號或密碼有誤');
    }

    await page.waitForTimeout(3000);
    await page.context().storageState({ path: './utils/auth/auth.json' });
  } else{
    console.log('不需登入');
    await page.context().storageState({ path: './utils/auth/auth.json' });
  }
}