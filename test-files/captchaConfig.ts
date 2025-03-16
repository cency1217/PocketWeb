interface PageConfig {
    submitButton: string;
    errorMessage: string;
    getCaptchaImage: (page: Page) => Promise<any>;  // 定義圖片定位的函數
    handleError?: (page: Page) => Promise<void>;
    handleSubmit?: (page: Page) => Promise<void>;  // 新增處理確認彈窗
}

export function getPageConfig(url: string): PageConfig {

    //出款申請
    if (url.includes('/wallet/')) {
        return {
            submitButton: '送出',
            errorMessage: '驗證碼有誤，請重新輸入',
            getCaptchaImage: (page) => page.getByLabel('出款申請').getByRole('img'),
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
            getCaptchaImage: (page) => page.locator('form img'),
            handleError: async (page) => {
                await page.locator('section').filter({ hasText: '變更失敗驗證碼有誤，請重新輸入' }).getByRole('button').click();
            }
        };
    }
    
    // 預設值（登入頁）
    return {
        submitButton: '登入',
        errorMessage: '* 驗證碼輸入錯誤',
        getCaptchaImage: (page) => page.getByRole('img', { name: 'captchaImage' })
    };
} 