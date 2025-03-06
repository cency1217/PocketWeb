import { test } from '@playwright/test';
import { getCaptcha } from '../../utils/getCaptcha';

test('login', async ({ page }) => {
  await getCaptcha(page);
});