import { createWorker } from 'tesseract.js';
import { Page } from '@playwright/test';
import { getPageConfig } from '@utils/captcha/captchaConfig';

export async function getCaptcha(page: Page): Promise<string | false> {
    let attempts = 0;
    const maxAttempts = 3;
    const imagePath = './utils/captcha/captcha.png';
    
    const { submitButton, errorMessage, getCaptchaImage, handleError, handleSubmit, fillCaptcha } = getPageConfig(page.url());
    
    while (attempts <= maxAttempts) {
        // 重產驗證碼
        if (attempts > 0) {
            await page.getByRole('button', { name: '' }).click();
            await page.waitForTimeout(500);
        }

        // 取得並辨識驗證碼
        const captchaImage = await getCaptchaImage(page);
        await captchaImage.screenshot({ path: imagePath });
        const worker = await createWorker('eng');
        const { data: { text } } = await worker.recognize(imagePath);
        await worker.terminate();
        
        // 處理驗證碼
        let tempCode = text.replace(/\D/g, '').trim().substring(0, 5);

        /* // 將最後一碼加1 驗證錯誤用
        if (tempCode.length === 5) {
            const lastDigit = parseInt(tempCode[4]);
            tempCode = tempCode.substring(0, 4) + ((lastDigit + 1) % 10);
        } */
        
        console.log('OCR 識別出的驗證碼:', tempCode);
        
        // 填入驗證碼並送出
        await fillCaptcha(page, tempCode);
        await page.getByRole('button', { name: submitButton }).click();

        // 出款申請多一個確認彈窗
        if (handleSubmit) await handleSubmit(page);

        // 檢查驗證碼是否辨識錯誤
        await page.waitForTimeout(500);
        const errorCount = await page.getByText(errorMessage).count();
        if (errorCount === 0) return tempCode;

        // 出款申請及變更密碼驗證碼有誤 多一個彈窗
        if (handleError) await handleError(page);

        attempts++;
        console.log(`驗證碼錯誤，第 ${attempts} 次重試`);
        if (attempts > maxAttempts) {
            console.log('已達最大重試次數');
            return false;
        }
    }
    
    return false;
}