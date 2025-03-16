import { Page, test } from '@playwright/test';
import { getUser } from './getUser';
import { getCaptcha } from './getCaptcha';
test.use({ storageState:'auth.json'});

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

    await page.waitForTimeout(5000);
    await page.context().storageState({ path: 'auth.json' });
  } else{
    console.log('不需登入');
    await page.context().storageState({ path: 'auth.json' });
  }
}