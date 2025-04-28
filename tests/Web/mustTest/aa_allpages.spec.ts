import { test, expect } from '@playwright/test';
import { getUser } from '@utils/auth/getUser';

test('test', async ({ page }) => {
  await page.goto('');

  const { USERNAME , PASSWORD } = await getUser(page);

  await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(USERNAME);
  await page.locator('#password').fill(PASSWORD);

  await page.waitForTimeout(10000); //暫停輸入驗證碼
  await page.getByRole('button', { name: '登入' }).click();
  await page.getByRole('button', { name: '關閉' }).click();
  await page.getByRole('button', { name: '關閉' }).click();
  
  await page.getByRole('link', { name: '口袋美股 新功能' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.locator('#mainSection').getByRole('link', { name: '口袋學堂' }).click();
  const page2 = await page2Promise;
  await page.getByRole('link', { name: 'ETF專區 新功能1' }).click();
  await page.locator('iframe[name="ETF"]').contentFrame().locator('div').filter({ hasText: 'ETF專區 台股ETF 美股ETF' }).nth(3).click();
  await page.locator('#mainSection').getByRole('link', { name: '口袋存股' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '申購' }).click();
  await page.locator('a').filter({ hasText: '信用專區' }).click();
  await page.getByRole('link', { name: '信用開戶' }).click();
  await page.locator('a').filter({ hasText: '帳務' }).hover();
  await page.locator('#mainSection').getByRole('link', { name: '口袋錢包' }).click();
  await page.locator('a').filter({ hasText: '個人服務' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '我的優惠' }).click();
  await page.locator('#web_trading_account').getByRole('link', { name: '交割帳號' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '資產總覽' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '委託/成交查詢' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '近三日交割款' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '美股帳務明細' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '額度申請' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '對帳單' }).click();
  await page.getByText('帳務/對帳單 請選擇月份').click();
  await page.locator('#mainSection').getByRole('link', { name: '我的優惠' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '線上簽署' }).click();
  await page.getByText('台股美股複委託6620-9802285').click();
  await page.locator('#mainSection').getByRole('link', { name: '憑證專區' }).click();
  await page.getByText('使用瀏覽器登入本系統需另行申請憑證，可適用於簽署、申購、定期、變更基本資料…等服務。憑證狀態您尚未安裝任何瀏覽器憑證申請憑證安裝說明電腦瀏覽器注意事項').click();
  await page.locator('#mainSection').getByRole('link', { name: '資料授權' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '密碼變更' }).click();
  await page.locator('div').filter({ hasText: /^舊\/補發密碼$/ }).click();
  await page.locator('#mainSection').getByRole('link', { name: '基本資料變更' }).click();
  await page.locator('div').filter({ hasText: /^憑證申請$/ }).getByRole('button').click();
  await page.locator('editprofile div').filter({ hasText: '證券帳號6620-9802285姓名身分證字號行動電話行動電話E-mailE-mail' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '客服中心' }).click();
  await page.locator('#mainSection').getByRole('link', { name: '公告' }).click();
  await page.getByText('【公告】銀行自動扣款(授扣)免收作業服務費用(口袋錢包)延長至2024年12月31日【公告】康芮颱風來襲，10/31').click();
});