import { test, expect } from '@playwright/test';

//使用登入狀態
test.use({ storageState:'webca.json'});

test('口袋錢包出款申請', async ({ page }) => {
  await page.goto('https://www.pocket.tw/wallet/');
  await page.getByRole('link', { name: '出款申請' }).click();
  await expect(page.getByText('出款日期')).toBeVisible();
  await expect(page.getByText('可出款金額')).toBeVisible();
  await expect(page.getByText('出款帳號')).toBeVisible();
  await expect(page.getByText('出款注意事項：')).toBeVisible();
  await expect(page.getByText('出款金額限制：')).toBeVisible();
  await expect(page.getByLabel('出款申請').getByRole('list')).toBeVisible();
  await expect(page.getByText('出款免收手續費。')).toBeVisible();
  await expect(page.getByText('出款時間受到銀行作業影響，可能有所延遲(數分鐘)。如申請後逾15分鐘仍未收到，請與本公司客服聯絡。')).toBeVisible();
  await expect(page.getByText('4. 每日系統帳務作業時間為 23:45-00:10')).toBeVisible();
  await expect(page.getByText('出款金額', { exact: true })).toBeVisible();
  await page.getByPlaceholder('請輸入出款金額').fill('5');
  await page.getByPlaceholder('請輸入驗證碼').click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await expect(page.getByText('出款申請成功')).toBeVisible();
});