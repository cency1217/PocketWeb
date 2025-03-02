import dotenv from 'dotenv';
import { Page, test } from '@playwright/test';

dotenv.config();

export async function isUAT(page: Page) {
  //
  test.slow()

  const baseURL = test.info().project.use.baseURL || '';
  // 根據 baseURL 判斷環境
  const isUAT = baseURL.includes('labpocket');
  const ENV = isUAT ? 'uat' : 'prod';
  console.log(`當前環境: ${ENV}`);

  // 根據環境設定帳號、密碼
  const USERNAME = isUAT ? process.env.uat_userID || '' : process.env.userID || '';
  const PASSWORD = isUAT ? process.env.uat_password || '' : process.env.password || '';
  // 傳回 USERNAME 和 PASSWORD
  return { USERNAME, PASSWORD };
}