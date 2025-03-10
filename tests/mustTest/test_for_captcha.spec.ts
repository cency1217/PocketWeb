import { test } from '@playwright/test';
import { getCaptcha } from '../../utils/getCaptcha';

test('login', async ({ page }) => {
  await page.goto('');
  const captchaImage = await page.getByRole('img', { name: 'captchaImage' });
  const imagePath = 'test-files/captcha.png';
  await captchaImage.screenshot({ path: imagePath });

  // 3. 使用 OCR 取得驗證碼
  const captchaCode = await getCaptcha(imagePath);

});