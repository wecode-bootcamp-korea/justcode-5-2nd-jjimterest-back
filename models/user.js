import prismaClient from './prisma-client.js';

export const createUser = async (
  email,
  password,
  nickname,
  name,
  profileImage
) => {
  return await prismaClient.users.create({
    data: {
      email,
      password,
      nickname,
      name,
      profile_image: profileImage ? profileImage : null,
    },
  });
};

export const createSocialUser = async (id, userId) => {
  return await prismaClient.social_login.create({
    data: {
      social_id: String(id),
      user_id: userId,
    },
  });
};

export const readUserByEmail = async email => {
  return await prismaClient.users.findUnique({ where: { email } });
};

export const readUserBySocialId = async id => {
  return await prismaClient.social_login.findFirst({
    where: { social_id: String(id) },
  });
};
