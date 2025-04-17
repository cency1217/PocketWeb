// 新增密碼生成函數
export function genPwd(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    // 隨機長度 (8-10)
    const length = Math.floor(Math.random() * 3) + 8;
    
    // 確保至少包含一個小寫字母、一個大寫字母和一個數字
    let password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        numbers[Math.floor(Math.random() * numbers.length)]
    ];
    
    // 所有可用字元集合
    const allChars = lowercase + uppercase + numbers;
    
    // 填充剩餘長度
    while (password.length < length) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
    
    // 打亂順序
    password = password.sort(() => Math.random() - 0.5);
    const PWD = password.join('');
    
    console.log('PWD',PWD);
    return PWD;
}

