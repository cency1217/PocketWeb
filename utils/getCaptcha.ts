import { Page, test } from '@playwright/test';
import Tesseract from 'tesseract.js';

export async function getCaptcha(page: Page) {
  test.slow();
  // 1. 前往需要驗證碼的網頁
  await page.goto('');

  // 2. 擷取驗證碼圖片
  const captchaImage = await page.getByRole('img',{name:'captchaImage'});
  await captchaImage.screenshot({ path: 'captcha.png' });

 // 3. 使用 Tesseract.js 進行 OCR 辨識
  const { data: { text } } = await Tesseract.recognize('captcha.png', 'eng', {
        //logger: m => console.log(m) // 可用來監測 OCR 進度
  });

  // 過濾掉非數字與大寫字母
  const captchaCode = text.replace(/[^A-Z0-9]/g, '').trim();

  console.log('OCR 識別出的驗證碼:', captchaCode);
  return { captchaCode };
}