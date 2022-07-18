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
