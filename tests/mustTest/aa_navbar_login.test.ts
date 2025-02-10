import { test, expect } from '@playwright/test';
test.use({ storageState:'auth.json'});

test('navbar', async ({ page }) => {
  test.setTimeout(150000);
  await page.goto('https://www.pocket.tw/');
  // await page.getByRole('link', { name: '口袋美股 新功能' }).click(); */

//   await page.getByRole('link', { name: 'ETF專區', exact: true }).click();
//   await expect(page).toHaveURL('https://www.pocket.tw/etf/');
//   await page.goBack();

 await page.locator('#mainSection a').filter({ hasText: '口袋存股' }).click();
 await expect(page).toHaveURL('https://www.pocket.tw/piggybank/');
 await page.goBack();

 await page.locator('#mainSection a').filter({ hasText: '申購' }).click();
 await expect(page).toHaveURL('https://www.pocket.tw/stock/draw/');
 await page.goBack();

//   await page.getByRole('link', { name: '信用專區', exact: true }).click();
//   await expect(page).toHaveURL('https://www.pocket.tw/stock/draw/');
//   await page.goBack();

  await page.locator('a').filter({ hasText: '帳務' }).first().hover();
  await expect(page.locator('#mainSection').getByText('口袋錢包', { exact: true })).toBeVisible();
  await expect(page.locator('#web_trading_account').getByRole('link', { name: '交割帳號' })).toBeVisible();
  await expect(page.locator('#mainSection').getByText('資產總覽')).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '委託/成交查詢' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '近三日交割款' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '美股帳務明細' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '額度申請' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '對帳單' })).toBeVisible();

  await page.locator('a').filter({ hasText: '個人服務' }).click();
  await expect(page.locator('#mainSection').getByRole('link', { name: '我的任務' })).toBeVisible();
  await expect(page.locator('#mainSection').getByText('我的優惠')).toBeVisible();
  await expect(page.locator('#mainSection').getByText('link', { name: '線上簽署' })).toBeVisible();
  await expect(page.locator('#mainSection').getByText('link', { name: '憑證專區' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '資料授權' })).toBeVisible();
  await expect(page.locator('#mainSection').getByText('link', { name: '密碼變更' })).toBeVisible();
  await expect(page.locator('#mainSection').getByRole('link', { name: '基本資料變更' })).toBeVisible();

  // await page.locator('#mainSection').getByRole('link', { name: '關於口袋' }).click();
  // await expect(page).toHaveURL('https://www.pocket.tw/footer/about_page/')
  // await page.goBack();

  // await page.locator('#mainSection').getByRole('link', { name: '客戶服務' }).click();
  // await expect(page).toHaveURL('https://www.pocket.tw/callcenter/')
  // await page.goBack();


});