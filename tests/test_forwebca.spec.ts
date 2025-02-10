import { test, expect } from '@playwright/test';
import { webca } from '../utils/webca.spec' 

test('withdraw', async ({ page }) => {
  await webca(page);
  await page.goto('/wallet/');
  await page.getByRole('link', { name: '出款申請' }).click();
  await page.getByPlaceholder('請輸入出款金額').fill('5');
  await page.getByPlaceholder('請輸入驗證碼').click();
  await page.waitForTimeout(10000);
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await expect(page.getByText('出款申請成功')).toBeVisible();
});