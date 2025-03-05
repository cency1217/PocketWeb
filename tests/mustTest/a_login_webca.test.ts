import { test } from '@playwright/test';
import { webca } from '../../utils/webca' 

test('get_webca', async ({ page }) => {
  await webca(page);
  
});