import bcrypt from 'bcrypt';
import * as myPageModels from '../models/mypage.js';

export async function readEditProfile(userId) {
  const mypage = await myPageModels.readEditProfile(userId);

  return mypage;
}

export async function readAccountSettings(userId) {
  const accountSettings = await myPageModels.readAccountSettings(userId);

  return accountSettings;
}

// 비밀번호 수정
export const updatePassword = async (
  userId,
  password,
  newPassword,
  confirmNewPassword
) => {
  const userPassword = await myPageModels.getUserPasswordbyId(userId);
  const check = await bcrypt.compare(password, userPassword[0].password);
  const salt = await bcrypt.genSalt();
  if (!check) {
    const error = new Error('비밀번호가 틀렸습니다.');
    error.statusCode = 400;
    throw error;
  }
  if (!(newPassword === confirmNewPassword)) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 400;
    throw error;
  }

  const encryptPassword = await bcrypt.hash(newPassword, salt);

  return await myPageModels.updatePassword(userId, encryptPassword);
};
