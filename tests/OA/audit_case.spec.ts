import { test, expect } from '@playwright/test';
import { testData } from '../../test-files/oa_testData';

// 尋找案件編號
async function findCase(page, caseNo) {
  let found = false;
  let currentPage = 1;
  
  while (!found) {
    // 檢查當前頁面是否存在案件編號
    await page.waitForTimeout(3000);
    const caseCount = await page.getByRole('button', { name: testData.case_no }).count();
    
    if (caseCount > 0) {
      found = true;
      break;
    }
    
    // 檢查是否有下一頁按鈕
    const nextButton = await page.locator('li').filter({ hasText: /^»$/ }).count();
    if (nextButton === 0) {
      console.log(`找不到案件編號 ${testData.case_no}`);
      return false;
    }
    
    // 點擊下一頁
    await page.locator('li').filter({ hasText: /^»$/ }).click();
    await page.waitForTimeout(1000); // 等待頁面加載
    currentPage++;
    
    // 設置最大搜索頁數，避免無限循環
    if (currentPage > 10) {
      console.log(`超過最大搜索頁數，找不到案件編號 ${caseNo}`);
      return false;
    }
  }
  
  return true;
}

test('case_audit', async ({ page }) => {
  test.setTimeout(testData.timeouts.test);
  await page.setViewportSize(testData.viewport);
  await page.goto('http://172.21.2.110/cms/client/auth/login');
  
  // 一審
  await page.getByPlaceholder('使用者帳號').fill('001');
  await page.getByPlaceholder('使用者帳號').press('Tab');
  await page.getByPlaceholder('密碼').fill('23');
  await page.getByRole('button', { name: '登入' }).click();

  await page.getByRole('link', { name: '待審核名單' }).click();
  await findCase(page, testData.case_no);
  await page.getByRole('button', { name: testData.case_no }).first().click();
  await page.getByText('徵信項目').click();
  await page.getByRole('button', { name: '自動介接' }).click();
  await expect(page.getByText('已更新成功')).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: '送出(進入二審)' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByText('測試一審').click();
  await page.getByTitle('登出').click();

  // 二審
  await page.getByPlaceholder('使用者帳號').fill('002');
  await page.getByPlaceholder('密碼').fill('23');
  await page.getByRole('button', { name: '登入' }).click();

  await page.getByRole('link', { name: '待審核名單' }).click();
  await findCase(page, testData.case_no);
  await page.getByRole('button', { name: testData.case_no }).first().click();
  await page.locator('label').filter({ hasText: /^交易額度$/ }).click();
  await page.getByText('單日買賣額度：').click();
  await page.locator('#DayTradeVal').fill('100');
  await page.getByRole('button', { name: '儲存' }).click();
  await expect(page.getByText('已更新成功')).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: '送出(進入三審)' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByText('測試二審').click();
  await page.getByTitle('登出').click();


  // 三審
  await page.getByPlaceholder('使用者帳號').fill('003');
  await page.getByPlaceholder('密碼').fill('23');
  await page.getByRole('button', { name: '登入' }).click();

  await page.getByRole('link', { name: '待審核名單' }).click();
  await findCase(page, testData.case_no);
  await page.getByRole('button', { name: testData.case_no }).first().click();
  await page.getByRole('button', { name: '送出(進入核決)' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByText('測試三審').click();
  await page.getByTitle('登出').click();


  // 核決
  await page.getByPlaceholder('使用者帳號').fill('004');
  await page.getByPlaceholder('密碼').fill('3');
  await page.getByRole('button', { name: '登入' }).click();

  await page.getByRole('link', { name: '待審核名單' }).click();
  await findCase(page, testData.case_no);
  await page.getByRole('button', { name: testData.case_no }).first().click();
  await page.getByRole('button', { name: '案件核決' }).click();
  await page.getByRole('button', { name: '確認' }).click();
});