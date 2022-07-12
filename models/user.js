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

export const readUserByEmail = async email => {
  return await prismaClient.users.findUnique({ where: { email } });
};

export const readUserById = async id => {
  return await prismaClient.users.findUnique({ where: { id } });
};
