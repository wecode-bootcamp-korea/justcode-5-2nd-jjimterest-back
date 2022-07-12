import prismaClient from './prisma-client.js';

export const createBoard = async (userId, title) => {
  return await prismaClient.boards.create({
    data: {
      title,
      user_id: userId,
    },
  });
};
