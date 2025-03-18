import * as dotenv from 'dotenv';
import { Page, test } from '@playwright/test';
dotenv.config();

export async function getUser(page: Page) {
  test.slow()
    // 根據 baseURL 判斷環境
  const baseURL = test.info().project.use.baseURL || '';
  const isUAT = baseURL.includes('labpocket');
  const ENV = isUAT ? 'uat' : 'prod';
  console.log(`當前環境: ${ENV}`);

  // 根據環境設定帳號、密碼、生日
  const USERNAME = isUAT ? process.env.uat_userID || '' : process.env.userID || '';
  const PASSWORD = isUAT ? process.env.uat_password || '' : process.env.password || '';
  const BIRTHDAY = isUAT ? process.env.uat_bday || '' : process.env.bday || '';
  // 傳回 USERNAME 和 PASSWORD
  return { USERNAME, PASSWORD, BIRTHDAY };
}