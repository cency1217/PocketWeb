import { Page, test } from '@playwright/test';
import { getUser } from '@utils/auth/getUser';
import { getCaptcha } from '@utils/captcha/getCaptcha';
import { checkLoginStatus, performLogin } from './loginAction';

test.use({ storageState:'auth.json'});

export async function login(page: Page) {
    test.slow();
    const { USERNAME, PASSWORD } = await getUser(page);
    
    await page.goto('');
    console.log('檢查登入狀態...');

    // First check if we're already logged in
    const isLoggedIn = await checkLoginStatus(page);
    if (isLoggedIn) {
        console.log('已登入狀態');
        await page.context().storageState({ path: 'auth.json' });
        return true;
    }

    console.log('需要登入，開始登入流程...');
    
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
        attempts++;
        console.log(`開始第 ${attempts} 次登入嘗試`);

        try {
            // Get captcha code
            const captchaCode = await getCaptcha(page);

            // Try login with captcha
            const loginSuccess = await performLogin(page, USERNAME, PASSWORD, captchaCode);
            if (loginSuccess) {
                console.log('登入成功');
                await page.waitForTimeout(3000);
                await page.context().storageState({ path: 'auth.json' });
                return true;
            }

            console.log('登入失敗');
        } catch (error) {
            console.log(`嘗試失敗: ${error.message}`);
        }
    }

    throw new Error('登入失敗，已達最大重試次數');
}