import * as fs from 'fs';

export function updateEnvFile(key: string, value: string) {
    const envPath = '.env';
    let envContent = fs.readFileSync(envPath, 'utf-8');
  
    // 使用正則表達式找到變數，然後替換它的值
    const regex = new RegExp(`^.*${key}=.*$`, 'm');
    if (envContent.match(regex)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
      fs.writeFileSync(envPath, envContent, 'utf-8');
      console.log(`✅ 更新 ${key} 為: ${value}`);
    } else {
      throw new Error(`❌ 找不到環境變數 ${key}，請確認 .env 檔案中是否存在此變數`);
    }
}