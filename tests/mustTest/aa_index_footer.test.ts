import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pocket.tw/');
  await page.getByRole('link', { name: '免責聲明' }).click();
  await expect(page.getByText('免責聲明口袋證券歡迎您使用本網站內所提供的各項金融資訊服務，為維護您的權益，請於您使用本網站前，詳細閱讀以下聲明；任何使用本網站之行為，皆視為您已同意本網站之各')).toBeVisible();
  await page.goBack();
  await page.getByRole('link', { name: '個資保護' }).click();
  await expect(page.getByText('個資保護口袋證券秉持落實個人資料保護及管理措施，遵循《個人資料保護法》所述之相關要求及保障個人資料當事人之權利，降低任何個人資料檔案受侵害之事件所可能帶來的衝擊')).toBeVisible();
  await page.goBack();
  await page.getByRole('link', { name: '網站隱私權政策聲明' }).click();
  await expect(page.getByText('網站隱私權保護政策 一.個人資料之蒐集 本網站會經由客戶服務中心、商品諮詢服務、社群網站（包括但不限於Facebook、Instagram及Line')).toBeVisible();
  await page.goBack();
  await page.getByRole('link', { name: '客戶資料共享管理隱私權政策' }).click();
  await expect(page.getByText('資料共享隱私權政策聲明 本公司為強化客戶資料運用之風險管理、提升客戶服務與效率，爰依「個人資料保護法」、金融監督管理委員會所訂定之「金融機構間資料共享指引」、本')).toBeVisible();
  await page.goBack();
  await page.getByRole('link', { name: '資通安全' }).click();
  await expect(page.getByText('資通安全前言： 身處資訊化社會與全球化時代，人與電腦、網路之關係益趨緊密。電子交易日趨普及，在經濟活動中，佔有相當重要的地位。利用電腦或電信技術在網路空間從事犯')).toBeVisible();
  await page.goBack();
  await page.getByRole('link', { name: '金融友善服務準則' }).click();
  await expect(page.getByText('金融友善服務準則口袋證券依中華民國證券商業同業公會會員金融友善服務準則配合辦理本服務準則項目，服務準則之內容如下列所示： 第一條(目的) 本準則訂定目的係為確保')).toBeVisible();
});
