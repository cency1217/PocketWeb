import { test, expect } from '@playwright/test';

//使用登入狀態
test.use({ storageState:'auth.json'});

test('申請憑證', async ({ page }) => {
  test.slow(); //延長測試時間三倍 因收驗證簡訊需較久的操作
  await page.goto('https://www.pocket.tw/webca/setting');
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('申請', { exact: true }).click();
  const page1 = await page1Promise;
  await page1.getByPlaceholder('20010203').fill('19970522');
  await page1.getByRole('button', { name: '驗證並發送簡訊驗證碼' }).click();
  await page1.getByPlaceholder('請輸入驗證碼').click();
  await page.waitForTimeout(20000);

  await page1.getByRole('button', { name: '確定' }).click();
  await page1.getByLabel('我已閱讀並同意憑證作業條款').check();
  await page1.getByRole('button', { name: '確定' }).click();

  await page.waitForTimeout(5000); 
  await page.context().storageState({path:'webca.json'}); //保存憑證狀態到json
});