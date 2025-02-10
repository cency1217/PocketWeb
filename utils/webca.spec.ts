import dotenv from 'dotenv';
import { Page, test } from '@playwright/test';
import { login } from "../utils/login.spec"

test.use({ storageState:'auth.json'});
test.use({ storageState:'webca.json'});

dotenv.config();

export async function webca(page: Page) {
    test.setTimeout(150000);

    const baseURL = test.info().project.use.baseURL || '';
    // 根據 baseURL 判斷環境
    const isUAT = baseURL.includes('labpocket');
    // 根據環境設定生日
    const Birthday = isUAT ? process.env.uat_bday || '' : process.env.bday || '';

    //前往憑證申請頁
    await login(page);
    await page.goto('/webca/setting');

   //檢查是否提示未申請憑證 
    const webcaPromt = await page.getByText('您尚未安裝任何瀏覽器憑證').count();
    if (webcaPromt > 0){
        console.log("需申請憑證");

        const page1Promise = page.waitForEvent('popup');
        await page.getByText('申請', { exact: true }).click();
        const page1 = await page1Promise;
        
        await page1.getByPlaceholder('20010203').fill(Birthday);
        await page1.getByRole('button', { name: '驗證並發送簡訊驗證碼' }).click();
        await page1.getByPlaceholder('請輸入驗證碼').click();
        await page.waitForTimeout(20000);
        await page1.getByRole('button', { name: '確定' }).click();
        
        await page1.getByLabel('我已閱讀並同意憑證作業條款').check();
        await page1.getByRole('button', { name: '確定' }).click();
    
        await page.waitForTimeout(5000); 
        await page.context().storageState({path:'webca.json'});
    } else{
        console.log("不需申請憑證");
    }

};