# PocketWeb 自動化測試專案

這是一個使用 Playwright 的自動化測試專案，用於測試 PocketWeb 網站的各項功能。

## 專案結構

```
.
├── tests/                # 測試文件目錄
│   ├── OA/              # OA 相關測試
│   └── Web/             # Web 相關測試
├── utils/               # 工具函數
│   ├── auth/           # 認證相關
│   └── captcha/        # 驗證碼處理
├── config/             # 配置文件
├── test-files/         # 測試相關文件
└── playwright.config.ts # Playwright 配置文件
```

## 環境要求

- Node.js
- npm 或 yarn
- Playwright

## 安裝步驟

1. 克隆專案：
```bash
git clone [repository-url]
```

2. 安裝依賴：
```bash
npm install
```

3. 安裝 Playwright 瀏覽器：
```bash
npx playwright install
```

## 使用方法

1. 運行所有測試：
```bash
npx playwright test
```

2. 運行特定測試：
```bash
npx playwright test tests/Web/mustTest/login.spec.ts
```

3. 查看測試報告：
```bash
npx playwright show-report
```

## 測試說明

### 認證測試
- 使用 `auth.json` 存儲登入狀態
- 支持自動處理驗證碼
- 包含登入、登出等功能測試

### OA 測試
- 包含案件審核等 OA 流程測試
- 在 `oa_testData.ts` 
- 案件審核`audit_case.spec.ts` 在審核前要先到 `oa_testData.ts` 將要審核的案件編號貼上去 其他開戶的資料也可以在該檔案裡調整

### Web 測試
- 
- 

## 注意事項

1. 認證文件
   - `auth.json` 和 `webca.json` 文件已被加入 `.gitignore`
   - 需要自行創建這些文件進行測試

2. 環境變數
   - 可參考 `.env.example`創建 `.env` 並使用 `.env` 文件存儲帳號、密碼及生日等資訊
   - 請勿將 `.env` 文件提交到版本控制

3. 測試報告
   - 測試報告保存在 `playwright-report` 目錄
   - 測試結果保存在 `test-results` 目錄

4.測試方式
   -在 【Testing】的project 可以控制運行的環境 `prod` 為正式 、`uat`為測試

