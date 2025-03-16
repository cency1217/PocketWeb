import { test, expect } from '@playwright/test';
import { webca } from '../../../utils/webca';
import { getCaptcha } from '../../../utils/getCaptcha';

//使用登入狀態
test.use({ storageState:'webca.json'});

test('口袋錢包出款申請', async ({ page }) => {
  test.slow();
  await webca(page);
  await page.goto('/wallet/');
  await page.getByRole('link', { name: '出款申請' }).click();

  await page.getByPlaceholder('請輸入出款金額').fill('10');

  const ocrSuccess = await getCaptcha(page);
  if (!ocrSuccess) {
      throw new Error('驗證碼辨識失敗');
  }

  await expect(page.getByText('出款申請成功')).toBeVisible();
});