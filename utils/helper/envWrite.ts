import * as fs from 'fs';
import * as path from 'path';
import { test } from '@playwright/test';

export function updateEnvFile(key: string, value: string) {
    try {
        const envPath = path.join(process.cwd(), 'config', 'env', '.env');
        if (!fs.existsSync(envPath)) {
            throw new Error(`❌ .env 檔案不存在: ${envPath}`);
        }

        // 檢查是否為 UAT 環境
        const isUAT = test.info().project.use.baseURL?.includes('labpocket');
        const targetKey = isUAT ? `uat_${key}` : key;

        const envContent = fs.readFileSync(envPath, 'utf-8');
        const regex = new RegExp(`^\\s*${targetKey}\\s*=.*$`, 'mi');
        
        if (!envContent.match(regex)) {
            throw new Error(`❌ 找不到環境變數 ${targetKey}`);
        }

        const updatedContent = envContent.replace(regex, `${targetKey} = ${value}`);
        fs.writeFileSync(envPath, updatedContent, 'utf-8');
        console.log(`✅ 更新 ${targetKey} 為: ${value}`);
    } catch (error) {
        throw error instanceof Error ? error : new Error('❌ 更新環境變數時發生未知錯誤');
    }
}