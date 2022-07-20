import prismaClient from './prisma-client.js';

export async function readEditProfile(userId) {
  const mypage = await prismaClient.$queryRawUnsafe(`
  select profile_image, name, intro, nickname
  from users
  where id = ${userId};
  `);

  return mypage;
}

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

export const updatePassword = async (user_id, password) => {
  return await prismaClient.$queryRaw`
    UPDATE users set password=${password} WHERE id=${user_id}
  `;
};
