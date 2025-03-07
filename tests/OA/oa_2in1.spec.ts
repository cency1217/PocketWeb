import { test, expect } from '@playwright/test';
import { generateTaiwanID } from '../../utils/idGen';
import { Page } from '@playwright/test';

async function fillBasicInfo(page: Page) {
  const idCard = generateTaiwanID();
  await page.getByPlaceholder('請輸入身分證字號').fill(idCard);
  await page.getByPlaceholder('YYYY-MM-DD').fill('1980-01-01');
  await page.getByPlaceholder('請輸入10碼手機號碼').fill('0900000000');
}

async function handleOTP(page: Page) {
  await page.getByRole('button', { name: '傳送驗證碼' }).click();
  const otpElement = page.getByText(/OTP:\s*\d+/);
  const otpText = await otpElement.textContent();
  const otpMatch = otpText?.match(/OTP:\s*(\d+)/);
  const otp = otpMatch ? otpMatch[1] : '';
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill(otp);
}

async function agreeToTerms(page: Page) {
  await page.locator('label').filter({ hasText: '我僅有中華民國國籍與稅籍，且出生地非美國' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByText('我僅有中華民國國籍與稅籍，且出生地非美國我已閱讀個人資料使用同意書').click();
  await page.getByText('我已閱讀個人資料使用同意書').click();
  await page.getByRole('button', { name: '我同意' }).click();
}

async function uploadIDDocuments(page: Page) {
  // 上傳身分證正面
  await page.locator('#IDFRONT').setInputFiles('test-files/id-01.jpg');
  await page.getByRole('button', { name: '確認送出' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: '確認無誤' }).click();

  // 上傳身分證背面
  await page.locator('#IDBACK').setInputFiles('test-files/id-02.jpg');
  await page.getByRole('button', { name: '確認送出' }).click();
  await page.waitForTimeout(3000);

  // 上傳第二證件正面
  await page.locator('#OTHERFRONT').setInputFiles('test-files/id-03.png');
  await page.getByRole('button', { name: '確認送出' }).click();
  await page.waitForTimeout(3000);
}

async function uploadSelfieWithID(page: Page) {
  await page.locator('#SELFIE_WITH_ID').setInputFiles('test-files/id-04.jpg');
  await page.getByRole('button', { name: '確認送出' }).click();
  await page.waitForTimeout(3000);
}

async function setupBankAccount(page: Page) {
  await page.getByText('請選擇銀行').click();
  await page.locator('li').filter({ hasText: '-測試銀行' }).click();
  await page.getByPlaceholder('請輸入銀行帳號').fill('0000123456789');
  await page.getByText('我已閱讀eDDA身分確認服務類約定條款').click();
  await page.getByRole('button', { name: '我同意' }).click();
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

async function fillPersonalInfo(page: Page) {
  // 基本資料
  await page.getByPlaceholder('請輸入戶名').fill('測試部二十二');
  await page.getByPlaceholder('民國年').fill('105');
  await page.locator('div').filter({ hasText: /^請選擇學歷博士碩士大學專科高中國中國小其他$/ }).getByRole('combobox').selectOption('3');
  
  // 聯絡資料
  await page.getByText('同戶籍地址', { exact: true }).click();
  await page.getByText('同行動電話', { exact: true }).click();
  await page.getByLabel('電子郵件信箱', { exact: true }).fill('test@gmail.com');
  await page.getByLabel('電子郵件信箱確認').fill('test@gmail.com');

  // 職業資料
  await page.locator('div').filter({ hasText: /^請選擇就業狀態受僱雇主\(創業\)退休自由業學生實習生專職操盤人員\(非受僱\)家管$/ }).getByRole('combobox').selectOption('1');
  await page.locator('.col-lg-9 > .mb-3 > .custom-select').first().selectOption('L0H');
  await page.getByPlaceholder('請輸入服務機構名稱').fill('口袋');
  await page.locator('div').filter({ hasText: /^請選擇職稱董事長總經理執行長營運長財務長副總經理 協理經理其他管理職特別助理行政人員業務人員工讀生工程師作業員設計師專業人員一般員工$/ }).getByRole('combobox').selectOption('2');
  
  // 公司聯絡資訊
  await page.getByPlaceholder('區碼').fill('02');
  await page.getByPlaceholder('電話').fill('00000000');
  await page.getByPlaceholder('#分機').fill('123');

  // 緊急聯絡人
  await page.getByPlaceholder('請輸入緊急聯絡人姓名').fill('測試人');
  await page.getByPlaceholder('請輸入緊急聯絡人手機').fill('0988888888');
  await page.locator('div').filter({ hasText: /^緊急聯絡人\*請提供可協助聯繫交割款之聯絡人請選擇緊急聯絡人關係配偶父母子女兄弟姊妹親戚朋友同事其他$/ }).getByRole('combobox').selectOption('2');
}

async function fillInvestmentInfo(page: Page) {
  // 投資資料
  await page.getByText('資產成長').click();
  await page.locator('form div').filter({ hasText: '個人年收入請選擇個人年收入50萬以下50萬至99萬100' }).getByRole('combobox').selectOption('2');
  await page.locator('form div').filter({ hasText: '個人（公司）財產總值請選擇個人（公司）財產總值少於300萬' }).getByRole('combobox').selectOption('2');
  await page.locator('form div').filter({ hasText: '可隨時變現資產請選擇可隨時變現資產少於300萬300萬至' }).getByRole('combobox').selectOption('2');
  await page.locator('div').filter({ hasText: /^薪水\/固定收入$/ }).nth(2).click();

  // 投資經驗
  await page.locator('div').filter({ hasText: /^請選擇投資經歷新開戶1年以下1年至2年2年至5年5年以上$/ }).getByRole('combobox').selectOption('2');
  await page.locator('div').filter({ hasText: /^請選擇投資期限短期中期長期不定期$/ }).getByRole('combobox').selectOption('1');
  await page.locator('div').filter({ hasText: /^請選擇交易頻率每日每週每月每季半年1年以上$/ }).getByRole('combobox').selectOption('2');
}

test('開戶流程測試', async ({ page }) => {
  test.setTimeout(150000);
  
  // 進入開戶頁面
  await page.goto('https://www.labpocket.tw/openaccountonline/oa/home?showYuShanBtn=Y&showSubBroBtn=Y&mkCode=MK0000&channel=CH0000&showRichartBtn=Y&show2h1Btn=Y');
  await page.getByRole('button', { name: '台股＋美股複委託', exact: true }).click();

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

  // 簽名並確認
  await page.getByRole('button', { name: '請在此簽名' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: '儲存' }).click();
  await page.waitForTimeout(3000);

  // 最終確認
  await page.getByText('本人已詳細審閱相關文件且明瞭同意全部內容，並一次簽訂各項契約及相關文件。同時本人對於所提供之資料其正確真實性負全責').click();
  await page.waitForTimeout(1500);
  await page.locator('div').filter({ hasText: '送出' }).nth(3).click();
  await page.getByRole('button', { name: '仍要傳送' }).click();
});