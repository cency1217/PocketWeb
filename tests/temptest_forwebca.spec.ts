import { test, expect } from '@playwright/test';
import { webca } from '../utils/webca' 

test('get_webca', async ({ page }) => {
  await webca(page);
  await page.goto('/webca/setting');
  await expect(page.getByText('有效')).toBeVisible();
});