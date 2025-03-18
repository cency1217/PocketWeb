import { createWorker } from 'tesseract.js';
import { Page } from '@playwright/test';

/**
 * 辨識驗證碼圖片
 * @throws {Error} 當驗證碼辨識失敗時拋出錯誤
 */
export async function getCaptcha(page: Page): Promise<string> {
    const CAPTCHA_LENGTH = 5;
    const DIGIT_REGEX = /[0-9]/g;
    const maxAttempts = 3;
    const imagePath = 'captcha.png';
    
    for (let attempt = 0; attempt <= maxAttempts; attempt++) {
        // 重產驗證碼
        if (attempt > 0) {
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(500);
        }

        // 取得並辨識驗證碼
        const captchaImage = await page.locator('#captchaImage');
        await captchaImage.screenshot({ path: imagePath });

        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(imagePath);
        await worker.terminate();
        
        // 只保留數字並取前5碼
        const digits = text.match(DIGIT_REGEX)?.join('') || '';
        const captchaCode = digits.substring(0, CAPTCHA_LENGTH);
        
        console.log('OCR 識別出的驗證碼:', captchaCode);
        
        if (captchaCode.length === CAPTCHA_LENGTH) {
            return captchaCode;
        }

        console.log(`驗證碼辨識失敗（第 ${attempt + 1} 次嘗試）`);
    }

    throw new Error('驗證碼辨識失敗，已達最大重試次數');
}