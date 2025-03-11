import Tesseract from 'tesseract.js';
import { Page } from '@playwright/test';

async function getCaptchaImage(page: Page) {
    const currentUrl = page.url();
    
    let captchaImage;
    
    if (currentUrl.includes('/wallet/')) {
        captchaImage = await page.getByLabel('出款申請').getByRole('img');
    } else if (currentUrl.includes('/account/settings/modify/')) {
        captchaImage = await page.locator('form img');
    } else {
        // 預設或首頁
        captchaImage = await page.getByRole('img', { name: 'captchaImage' });
    }
    
    return captchaImage;
}

export async function getCaptcha(page: Page) {
    const imagePath = 'test-files/captcha.png';
    const captchaImage = await getCaptchaImage(page);
    await captchaImage.screenshot({ path: imagePath });
    
    // OCR 辨識
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    
    // 過濾非數字
    const captchaCode = text.replace(/\D/g, '').trim().substring(0, 5);
    
    console.log('OCR 識別出的驗證碼:', captchaCode);
    return captchaCode;
}