import dotenv from 'dotenv';
import { Page, test } from '@playwright/test';

test.use({ storageState:'auth.json'});

dotenv.config();
/* const USERNAME = process.env.userID || ""
const PASSWORD = process.env.password || "" */

export async function login(page: Page) {
  //
  test.slow()

  const baseURL = test.info().project.use.baseURL || '';
  // 根據 baseURL 判斷環境
  const isUAT = baseURL.includes('labpocket');
  const ENV = isUAT ? 'uat' : 'prod';

  // 根據環境設定帳號、密碼
  const USERNAME = isUAT ? process.env.uat_userID || '' : process.env.userID || '';
  const PASSWORD = isUAT ? process.env.uat_password || '' : process.env.password || '';

  console.log(`當前環境: ${ENV}`);
  console.log(`使用 baseURL: ${baseURL}`);
  console.log(`使用帳號: ${USERNAME}`);

  // 前往首頁
  await page.goto('');

  // 檢查是否顯示登入提示文字
  const loginPrompt = await page.locator('#homepagebg').getByText('登入後提供更多服務').count();
    
  if (loginPrompt > 0) {
    console.log('需登入');
    // 填寫帳號
    await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
    // 填寫密碼
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#password').press('Tab');
  
    // 填寫驗證碼（手動輸入驗證碼）
    await page.getByRole('textbox', { name: '請輸入驗證碼' }).click();
    await page.waitForTimeout(10000); // 等待使用者輸入驗證碼
  
    // 點擊登入按鈕
    await page.getByRole('button', { name: '登入' }).click();
  
    // 等待登入完成並儲存狀態
    await page.waitForTimeout(5000);
     // 保存登入狀態到檔案
    await page.context().storageState({ path: 'auth.json' });
  } else{
    console.log('不需登入');
    await page.context().storageState({ path: 'auth.json' });
  }

  


}