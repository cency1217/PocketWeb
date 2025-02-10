import { test, expect } from '@playwright/test';
test.use({ storageState:'auth.json'});

test('九宮格', async ({ page }) => {
  test.setTimeout(150000);
  await page.goto('https://www.pocket.tw/');

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '口袋錢包' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/wallet/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '資產總覽' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/stock/asset/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '口袋存股' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/piggybank/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '信用專區' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/credit/margin_account/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '憑證專區' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/webca/setting');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '申購' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/stock/draw/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '線上簽署' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/sign');
  await page.goBack();
  
  await page.locator('#carouselFunctionButton').getByRole('link', { name: '我的優惠' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/account/coupon/');
  await page.goBack();

  await page.locator('#carouselFunctionButton').getByRole('link', { name: '密碼變更' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/account/settings/modify/');
  await page.goBack();
});