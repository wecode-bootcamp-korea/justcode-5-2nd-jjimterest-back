import prismaClient from './prisma-client.js';

export const createBoard = async (userId, title) => {
  return await prismaClient.boards.create({
    data: {
      title,
      user_id: userId,
    },
  });
};

export const readBoardById = async board_id => {
  return await prismaClient.boards.findUnique({
    where: { id: Number(board_id) },
  });
};

export const deleteBoard = async board_id => {
  return await prismaClient.boards.delete({ where: { id: Number(board_id) } });
};
