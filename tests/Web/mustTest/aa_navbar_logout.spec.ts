import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(240000);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('link', { name: '口袋證券logo' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/');

  // await page.getByRole('link', { name: '口袋美股', exact: true }).click();
  // const page4Promise = page.waitForEvent('popup');
  // await expect(page4Promise).toHaveURL('https://events.pocket.tw/usanavweb-28780');

  // await page.locator('#mainSection').getByRole('link', { name: '口袋學堂' }).click();
  // const page4 = await page4Promise;
  // const page5Promise = page.waitForEvent('popup');

  // await page.getByRole('link', { name: '口袋存股' }).click();
  // const page5 = await page5Promise;
  // await page5.goto('https://events.pocket.tw/buystock-30214?utm_source=pocketweb');
  // await expect(page5).toHaveURL('https://events.pocket.tw/buystock-30214?utm_source=pocketweb')

  await page.getByRole('link', { name: 'ETF專區', exact: true }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/etf/');
  await page.goBack();

  await page.getByRole('link', { name: '口袋台股APP', exact: true }).click();
  await expect(page).toHaveURL('https://events.pocket.tw/feature-29647');
  await page.goBack();

  await page.locator('#mainSection').getByRole('link', { name: '關於口袋' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/footer/about_page/')
  await page.goBack();

  await page.locator('#mainSection').getByRole('link', { name: '客服中心' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/callcenter/')
  await page.goBack();

  await page.locator('#mainSection').getByRole('link', { name: '公告' }).click();
  await expect(page).toHaveURL('https://www.pocket.tw/announcement/');
  await page.goBack();

});