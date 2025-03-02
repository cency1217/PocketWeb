import { test } from '@playwright/test';
import { login } from '../../utils/login.spec';

test('login', async ({ page }) => {
  await login(page);
});
