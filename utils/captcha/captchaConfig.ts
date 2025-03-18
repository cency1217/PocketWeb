import { Page } from "@playwright/test";

interface PageConfig {
    submitButton: string;
    errorMessage: string;
    getCaptchaImage: (page: Page) => Promise<any>;  // 定義圖片定位的函數
    handleError?: (page: Page) => Promise<void>;
    handleSubmit?: (page: Page) => Promise<void>;  // 新增處理確認彈窗
    fillCaptcha: (page: Page, code: string) => Promise<void>;  // 新增驗證碼輸入的函數
}

export function getPageConfig(url: string): PageConfig {

    //出款申請
    if (url.includes('/wallet/')) {
        return {
            submitButton: '送出',
            errorMessage: '驗證碼有誤，請重新輸入',
            getCaptchaImage: async (page) => page.getByLabel('出款申請').getByRole('img'),
            fillCaptcha: async (page, code) => {
                await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill(code);
            },
            handleSubmit: async (page) => {
                await page.getByRole('button', { name: '確認' }).click();
            },
            handleError: async (page) => {
                await page.getByRole('button', { name: '關閉' }).click();
            }
        };
    } 
    
    //密碼變更
    if (url.includes('/account/settings/modify/')) {
        return {
            submitButton: '確認',
            errorMessage: '驗證碼有誤，請重新輸入',
            getCaptchaImage: async (page) => page.locator('form img'),
            fillCaptcha: async (page, code) => {
                await page.getByPlaceholder('請輸入驗證碼').fill(code);
            },
            handleError: async (page) => {
                await page.locator('section').filter({ hasText: '變更失敗驗證碼有誤，請重新輸入' }).getByRole('button').click();
            }
        };
    }
    
    // 預設值（登入頁）
    return {
        submitButton: '登入',
        errorMessage: '* 驗證碼輸入錯誤',
        getCaptchaImage: async (page) => page.getByRole('img', { name: 'captchaImage' }),
        fillCaptcha: async (page, code) => {
            await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill(code);
        }
    };
} 