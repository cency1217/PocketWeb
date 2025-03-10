import { test } from '@playwright/test';
import { getCaptcha } from '../../utils/getCaptcha';

test('login', async ({ page }) => {
  page.goto('');
  const captchaImage = await page.getByRole('img',{name:'captchaImage'});
  
  await captchaImage.screenshot({ path: 'test-files/captcha.png' });
  const { captchaCode } = await getCaptcha();


});