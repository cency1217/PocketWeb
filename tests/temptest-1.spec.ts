import { test, expect } from '@playwright/test';
import { login } from '@utils/auth/login';

test('test', async ({ page }) => {
  await login(page);

  // test
  await page.goto('/wallet/');
  await expect(page.getByRole('link', { name: '出款申請' })).toBeVisible();
});

/* 
玩玩看Git

1.開新的branch 
  -> git branch Test
2.切換到新的branch
  -> git checkout Test
3.新建一個檔案 
  -> git add test_file.ts
4.把檔案放到commit stage 
  -> git commit -m "記錄的訊息"
5.推到雲端 
  -> git push
6.可以在左邊vscode的原始控制圖表看到新的
7.也可以去github上找找, 會有推上去的

再用git checkout main 就可以切回原本的分支了
git刪除Test分支即可~

分支: branch
全程在終端機操作呦
*/
