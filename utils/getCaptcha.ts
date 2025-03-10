import Tesseract from 'tesseract.js';

export async function getCaptcha(path : string) {
  // 1. 前往需要驗證碼的網頁
/*   await page.goto('' , {waitUntil: 'domcontentloaded'});

  // 2. 擷取驗證碼圖片
  const captchaImage = await page.getByRole('img',{name:'captchaImage'});
  await captchaImage.screenshot({ path: 'test-files/captcha.png' }); */

 // 3. 使用 Tesseract.js 進行 OCR 辨識
  const { data: { text } } = await Tesseract.recognize('test-files/captcha.png', 'eng', {
        //logger: m => console.log(m) // 可用來監測 OCR 進度
  });

  // 過濾掉非數字與大寫字母
  const captchaCode = text.replace(/\D/g, '').trim().substring(0, 5);

  console.log('OCR 識別出的驗證碼:', captchaCode);
  return { captchaCode };
}