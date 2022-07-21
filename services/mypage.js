import bcrypt from 'bcrypt';
import * as userRepositroy from '../models/user.js';
import * as myPageModels from '../models/mypage.js';

// 공개 프로필 수정 페이지 불러오기
export async function readEditProfile(userId) {
  const mypage = await myPageModels.readEditProfile(userId);

  return mypage;
}

// 프로필 사진, 이름, 소개, 닉네임 변경
export async function updateProfile(userInfo) {
  const { userId, name, intro, nickname, image } = userInfo;
  const user = await userRepositroy.readUserById(userId);
  const profile_image = image ? image : user.profile_image;
  return await myPageModels.updateProfile(
    userId,
    name,
    intro,
    nickname,
    profile_image
  );
}

// 비밀번호 변경 페이지 불러오기
export async function readAccountSettings(userId) {
  const accountSettings = await myPageModels.readAccountSettings(userId);

  return accountSettings;
}

// 비밀번호 변경
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
