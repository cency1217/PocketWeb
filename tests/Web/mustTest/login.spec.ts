import { test } from '@playwright/test';
import { login } from '@utils/auth/login';

test('login', async ({ page }) => {
  await login(page);
});
