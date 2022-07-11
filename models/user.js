import prismaClient from './prisma-client.js';

export const createUser = async (email, password, nickname, name) => {
  return await prismaClient.users.create({
    data: {
      email,
      password,
      nickname,
      name,
    },
  });
};

export const readUserByEmail = async email => {
  return await prismaClient.users.findUnique({ where: { email } });
};
