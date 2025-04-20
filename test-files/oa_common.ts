import { Page } from '@playwright/test';
import { generateTaiwanID } from '@utils/helper/genID';
import { testData } from './oa_testData';

export async function fillBasicInfo(page: Page) {
  const idCard = generateTaiwanID();
  await page.getByPlaceholder('請輸入身分證字號').fill(idCard);
  await page.getByPlaceholder('YYYY-MM-DD').fill(testData.birthDate);
  await page.getByPlaceholder('請輸入10碼手機號碼').fill(testData.phoneNumber);
}

export async function handleOTP(page: Page) {
  await page.getByRole('button', { name: '傳送驗證碼' }).click();
  const otpElement = page.getByText(/OTP:\s*\d+/);
  const otpText = await otpElement.textContent();
  const otpMatch = otpText?.match(/OTP:\s*(\d+)/);
  const otp = otpMatch ? otpMatch[1] : '';
  await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill(otp);
}

export async function agreeToTerms(page: Page) {
  await page.locator('label').filter({ hasText: '我僅有中華民國國籍與稅籍' }).click();
  await page.getByRole('button', { name: '確認' }).click();
  await page.getByText('我已閱讀個人資料使用同意書').click();
  await page.getByRole('button', { name: '我同意' }).click();
}

export async function uploadFile(page: Page, selector: string, filePath: string, needConfirm: boolean = false) {
  await page.locator(selector).setInputFiles(filePath);
  await page.getByRole('button', { name: '確認送出' }).click();
  await page.waitForTimeout(testData.timeouts.standard);
  if (needConfirm) {
    await page.getByRole('button', { name: '確認無誤' }).click();
  }
}

export async function uploadIDDocuments(page: Page) {
  // 上傳身分證正面
  await uploadFile(page, '#IDFRONT', testData.files.idFront, true);

  // 上傳身分證背面
  await uploadFile(page, '#IDBACK', testData.files.idBack);

  // 上傳第二證件正面
  await uploadFile(page, '#OTHERFRONT', testData.files.secondaryId);
}

export async function uploadSelfieWithID(page: Page) {
  await uploadFile(page, '#SELFIE_WITH_ID', testData.files.selfieWithId);
}

export async function setupBankAccount(page: Page) {
  await page.getByText('請選擇銀行').click();
  await page.locator('li').filter({ hasText: '-測試銀行' }).click();
  await page.getByPlaceholder('請輸入銀行帳號').fill(testData.bankAccount);
  await page.getByText('我已閱讀eDDA身分確認服務類約定條款').click();
  await page.getByRole('button', { name: '我同意' }).click();
}

export async function fillPersonalInfo(page: Page) {
  // 基本資料
  await page.getByPlaceholder('請輸入戶名').fill(testData.name);
  await page.getByPlaceholder('民國年').fill(testData.idYear);
  await page.locator('div').filter({ hasText: /^請選擇學歷博士碩士大學專科高中國中國小其他$/ }).getByRole('combobox').selectOption(testData.education);
  
  // 聯絡資料
  await page.getByText('同戶籍地址', { exact: true }).click();
  await page.getByText('同行動電話', { exact: true }).click();
  await page.getByLabel('電子郵件信箱', { exact: true }).fill(testData.email);
  await page.getByLabel('電子郵件信箱確認').fill(testData.email);

  // 職業資料
  await page.locator('div').filter({ hasText: /^請選擇就業狀態受僱雇主\(創業\)退休自由業學生實習生專職操盤人員\(非受僱\)家管$/ }).getByRole('combobox').selectOption(testData.employmentStatus);
  await page.locator('.col-lg-9 > .mb-3 > .custom-select').first().selectOption(testData.industryCode);
  await page.getByPlaceholder('請輸入服務機構名稱').fill(testData.companyName);
  await page.locator('div').filter({ hasText: /^請選擇職稱董事長總經理執行長營運長財務長副總經理 協理經理其他管理職特別助理行政人員業務人員工讀生工程師作業員設計師專業人員一般員工$/ }).getByRole('combobox').selectOption(testData.jobTitle);
  
  // 公司聯絡資訊
  await page.getByPlaceholder('區碼').fill(testData.companyPhone.areaCode);
  await page.getByPlaceholder('電話').fill(testData.companyPhone.number);
  await page.getByPlaceholder('#分機').fill(testData.companyPhone.extension);

  // 緊急聯絡人
  await page.getByPlaceholder('請輸入緊急聯絡人姓名').fill(testData.emergencyContact.name);
  await page.getByPlaceholder('請輸入緊急聯絡人手機').fill(testData.emergencyContact.phone);
  await page.locator('div').filter({ hasText: /^請選擇緊急聯絡人關係配偶父母子女兄弟姊妹親戚朋友同事其他\*若緊急聯絡人關係為父母或配偶，應與身分證背面資訊一致$/ }).getByRole('combobox').selectOption(testData.emergencyContact.relationship);
}

export async function fillInvestmentInfo(page: Page) {
  // 投資資料
  await page.getByText('資產成長').click();
  await page.locator('form div').filter({ hasText: '個人年收入請選擇個人年收入50萬以下50萬至99萬100' }).getByRole('combobox').selectOption(testData.investment.annualIncome);
  await page.locator('form div').filter({ hasText: '個人（公司）財產總值請選擇個人（公司）財產總值少於300萬' }).getByRole('combobox').selectOption(testData.investment.totalAssets);
  await page.locator('form div').filter({ hasText: '可隨時變現資產請選擇可隨時變現資產少於300萬300萬至' }).getByRole('combobox').selectOption(testData.investment.liquidAssets);
  await page.locator('div').filter({ hasText: /^薪水\/固定收入$/ }).nth(2).click();

  // 投資經驗
  await page.locator('div').filter({ hasText: /^請選擇投資經歷新開戶1年以下1年至2年2年至5年5年以上$/ }).getByRole('combobox').selectOption(testData.investment.experience);
  await page.locator('div').filter({ hasText: /^請選擇投資期限短期中期長期不定期$/ }).getByRole('combobox').selectOption(testData.investment.period);
  await page.locator('div').filter({ hasText: /^請選擇交易頻率每日每週每月每季半年1年以上$/ }).getByRole('combobox').selectOption(testData.investment.frequency);
} 