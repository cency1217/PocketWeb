import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByLabel('立即開戶', { exact: true }).click();
  const page1 = await page1Promise;
  await page1.goto('https://www.pocket.tw/openaccountonline/oa/home?mkCode=MK0000&channel=CH0003&utm_source=pocketw&openExternalBrowser=1&showYuShanBtn=Y');
  await page1.getByRole('button', { name: '台股＋美股複委託' }).click();
  
  await page1.goBack();
  await page1.getByRole('button', { name: '台股帳戶', exact: true }).click();
  await page1.goto('https://www.pocket.tw/openaccountonline/oa/login/new?group=B1&showYuShanBtn=Y&openExternalBrowser=1&utm_source=pocketw&channel=CH0003&mkCode=MK0000');
});