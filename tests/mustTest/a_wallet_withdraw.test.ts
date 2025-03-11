import { test, expect } from '@playwright/test';
import { webca } from '../../utils/webca';
import { getCaptcha } from '../../utils/getCaptcha';

//使用登入狀態
test.use({ storageState:'webca.json'});

test('口袋錢包出款申請', async ({ page }) => {
  await webca(page);
  await page.goto('/wallet/');

  await page.getByPlaceholder('請輸入出款金額').fill('10');
  const captchaCode = await getCaptcha(page);
  await page.getByPlaceholder('請輸入驗證碼').fill(captchaCode);
  
  await page.getByRole('button', { name: '送出' }).click();
  await page.getByRole('button', { name: '確認' }).click();

  await expect(page.getByText('出款申請成功')).toBeVisible();
});