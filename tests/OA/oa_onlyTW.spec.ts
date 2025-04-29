import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { testData } from '../../test-files/oa_testData';
import {
  fillBasicInfo,
  handleOTP,
  agreeToTerms,
  uploadIDDocuments,
  uploadSelfieWithID,
  setupBankAccount,
  fillPersonalInfo,
  fillInvestmentInfo,
} from '../../test-files/oa_common';

async function agreeToFinalTerms(page: Page) {
  // 只需同意台股相關文件
  await page.locator('div').filter({ hasText: '本人已詳閱證券開戶文件並同意其規定' }).nth(4).click();
  await page.getByRole('button', { name: '我同意' }).click();
  await page.getByText('本人已確認並同意簽署金融機構執行共同申報及盡職審查(CRS').click();
  await page.getByRole('button', { name: '我同意' }).click();
}

test('oa_onlyTW', async ({ page }) => {
  test.setTimeout(testData.timeouts.test);
  await page.setViewportSize(testData.viewport);
  
  // 進入開戶頁面
  await page.goto(testData.url);
  await page.getByRole('button', { name: '台股帳戶', exact: true }).click();

  // 填寫基本資料
  await fillBasicInfo(page);
  await handleOTP(page);
  await agreeToTerms(page);
  
  // 開始申請流程
  await page.getByRole('button', { name: '開始申請' }).click();
  await page.waitForTimeout(3000);

  // 上傳身分證件
  await uploadIDDocuments(page);
  await page.getByRole('button', { name: '下一步' }).click();
  await page.waitForTimeout(3000);

  // 設定銀行帳戶
  await setupBankAccount(page);
  await page.getByRole('button', { name: '下一步' }).click();

  // 上傳手持自拍照
  await uploadSelfieWithID(page);
  await page.getByRole('button', { name: '下一步' }).click();

  // 填寫個人資料
  await fillPersonalInfo(page);
  await page.getByRole('button', { name: '下一步' }).click();

  // 填寫投資資料
  await fillInvestmentInfo(page);
  await page.getByRole('button', { name: '下一步' }).click();
  await page.getByRole('button', { name: '下一步' }).click();

  // 同意最終條款
  await agreeToFinalTerms(page);
  await page.getByRole('button', { name: '下一步' }).click();

  // 最終確認
  await page.getByText('本人已詳細審閱相關文件且明瞭同意全部內容，並一次簽訂各項契約及相關文件。同時本人對於所提供之資料其正確真實性負全責').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: '送出' }).click();
  await page.waitForTimeout(testData.timeouts.standard);
  await page.getByRole('button', { name: '仍要傳送' }).click();
});