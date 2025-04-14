export function generateTaiwanID(): string {
    const letters = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
    const firstLetter = letters[Math.floor(Math.random() * letters.length)];
    const firstLetterIndex = letters.indexOf(firstLetter) + 10;
    const gender = Math.random() < 0.5 ? 1 : 2; // 1: Male, 2: Female
    const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
    
    let idArray = [
        Math.floor(firstLetterIndex / 10),
        firstLetterIndex % 10,
        gender,
        ...numbers
    ];
    
    let checksum = idArray[0] + idArray[1] * 9 + idArray[2] * 8;
    for (let i = 3; i <= 9; i++) {
        checksum += idArray[i] * (10 - i);
    }
    const checkDigit = (10 - (checksum % 10)) % 10;
    
    // 將身分證字號組合存入變數
    const idNumber = `${firstLetter}${gender}${numbers.join('')}${checkDigit}`;
    console.log('生成的身分證字號:', idNumber);
    
    return idNumber;
};
