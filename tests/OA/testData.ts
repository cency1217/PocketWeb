export const testData = {
  // 基本資料
  birthDate: '1980-01-01',
  phoneNumber: '0933561715',
  
  // 個人資料
  name: '測試部二十一',
  idYear: '105',
  education: '3', // 大學
  email: 'cencyhuang@gmail.com',
  
  // 職業資料
  employmentStatus: '1', // 受僱
  industryCode: 'L0H',
  companyName: '口袋',
  jobTitle: '2', // 總經理
  
  // 公司聯絡資訊
  companyPhone: {
    areaCode: '02',
    number: '00000000',
    extension: '123'
  },
  
  // 緊急聯絡人
  emergencyContact: {
    name: '你啊罵',
    phone: '0988888888',
    relationship: '2' // 父母
  },
  
  // 投資資料
  investment: {
    annualIncome: '2', // 50萬至99萬
    totalAssets: '2', // 300萬至500萬
    liquidAssets: '2', // 300萬至500萬
    experience: '2', // 1年至2年
    period: '1', // 短期
    frequency: '2' // 每週
  },

  // 銀行帳戶
  bankAccount: '0000123456789',

  // 檔案路徑
  files: {
    idFront: 'test-files/id-01.jpg',
    idBack: 'test-files/id-02.jpg',
    secondaryId: 'test-files/id-03.png',
    selfieWithId: 'test-files/id-04.jpg'
  },

  // 網站設定
  url: 'https://www.labpocket.tw/openaccountonline/oa/home?showYuShanBtn=Y&showSubBroBtn=Y&mkCode=MK0000&channel=CH0000&showRichartBtn=Y&show2h1Btn=Y',

  // 頁面設定
  viewport: {
    width: 1500,
    height: 900
  },

  // 等待時間設定
  timeouts: {
    standard: 3000,
    long: 30000,
    test: 120000
  }
}; 