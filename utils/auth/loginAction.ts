import { Page } from '@playwright/test';

/**
 * 檢查是否為未登入狀態
 */
async function isNotLoggedIn(page: Page): Promise<boolean> {
    const loginPrompt = await page.locator('#homepagebg').getByText('登入後提供更多服務').count();
    return loginPrompt > 0;
}

export async function performLogin(page: Page, username: string, password: string, captchaCode: string): Promise<boolean> {
    await page.getByRole('textbox', { name: '請輸入身分證字號' }).fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('textbox', { name: '請輸入驗證碼' }).fill(captchaCode);
    
    await page.getByRole('button', { name: '登入' }).click();
    await page.waitForTimeout(500);

    return !(await isNotLoggedIn(page));
}

export async function checkLoginStatus(page: Page): Promise<boolean> {
    return !(await isNotLoggedIn(page));
}

