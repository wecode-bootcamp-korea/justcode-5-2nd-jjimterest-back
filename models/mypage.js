import prismaClient from './prisma-client.js';

// 공개 프로필 수정 페이지 불러오기
export async function readEditProfile(userId) {
  const mypage = await prismaClient.$queryRawUnsafe(`
  select profile_image, name, intro, nickname
  from users
  where id = ${userId};
  `);

  return mypage;
}

// 프로필 사진, 이름, 소개, 닉네임 변경
export async function updateProfile(userInfo) {
  const result = await prismaClient.$queryRaw`
  UPDATE users SET name=${userInfo.name},intro=${userInfo.intro},nickname=${userInfo.nickname} 
  WHERE id=${userInfo.userId}
  `;

  return result;
}

// 비밀번호 변경 페이지 불러오기
export async function readAccountSettings(userId) {
  const accountSettings = await prismaClient.$queryRawUnsafe(`
  select email, password
  from users
  where id = ${userId};
  `);

  return accountSettings;
}

export const getUserPasswordbyId = async user_id => {
  return await prismaClient.$queryRaw`
        SELECT password FROM users WHERE id=${user_id}`;
};

// 비밀번호 변경
export const updatePassword = async (user_id, password) => {
  return await prismaClient.$queryRaw`
    UPDATE users set password=${password} WHERE id=${user_id}
  `;
};
