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

async function drawSignature(page: Page) {
  // 找到簽名區域的 canvas
  const canvas = page.locator('canvas').first();
  const box = await canvas.boundingBox();
  
  if (!box) {
    throw new Error('Cannot find signature canvas');
  }

  // 計算簽名區域的中心點
  const centerX = box.x + box.width / 2;
  const centerY = box.y + box.height / 2;

  // 簽名
  await page.mouse.move(centerX + 30, centerY - 20);
  await page.mouse.down();
  for (let i = 0; i < 15; i++) {
    const angle = (Math.PI / 2) + (i * Math.PI / 7);
    const x = centerX + Math.cos(angle) * 40;
    const y = centerY + Math.sin(angle) * 40;
    await page.mouse.move(x, y, { steps: 5 });
  }
  await page.mouse.up();
}

async function agreeToFinalTerms(page: Page) {
  const agreements = [
    '本人已詳閱證券開戶文件並同意其規定',
    '本人已詳閱美股複委託開戶文件並同意其規定',
    '本人已詳閱W-8BEN契約書並同意其規定',
    '本人已確認並同意簽署金融機構執行共同申報及盡職審查(CRS'
  ];

  for (const agreement of agreements) {
    await page.getByText(agreement).click();
    await page.getByRole('button', { name: '我同意' }).click();
  }
}

test('oa_2in1', async ({ page }) => {
  test.setTimeout(testData.timeouts.test);
  await page.setViewportSize(testData.viewport);
  
  // 進入開戶頁面
  await page.goto(testData.url);
  await page.getByRole('button', { name: '台股＋美股複委託', exact: true }).click();

  // 填寫基本資料
  await fillBasicInfo(page);
  await handleOTP(page);
  await agreeToTerms(page);
  
  // 開始申請流程
  await page.getByRole('button', { name: '開始申請' }).click();
  await page.waitForTimeout(testData.timeouts.standard);

  // 上傳身分證件
  await uploadIDDocuments(page);
  await page.getByRole('button', { name: '下一步' }).click();
  await page.waitForTimeout(testData.timeouts.standard);

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

  // 簽署 W-8BEN
  await page.getByRole('button', { name: '請在此簽名' }).click();
  await page.waitForTimeout(testData.timeouts.standard);
  await drawSignature(page);
  await page.waitForTimeout(testData.timeouts.standard);
  await page.getByRole('button', { name: '儲存' }).click();
  await page.waitForTimeout(testData.timeouts.standard);

  // 最終確認
  await page.getByText('本人已詳細審閱相關文件且明瞭同意全部內容，並一次簽訂各項契約及相關文件。同時本人對於所提供之資料其正確真實性負全責').click();
  await page.waitForTimeout(testData.timeouts.standard);
  await page.getByRole('button', { name: '送出' }).click();
  await page.waitForTimeout(testData.timeouts.standard);
  await page.getByRole('button', { name: '仍要傳送' }).click();
});