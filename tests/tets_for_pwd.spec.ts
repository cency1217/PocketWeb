import { test, expect } from '@playwright/test';
import { genPwd } from '../utils/genPwd' 

test('test', async () => {
  const pwd = genPwd();
  console.log(pwd);
});