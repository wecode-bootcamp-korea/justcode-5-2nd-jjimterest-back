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
  return await prismaClient.boards.findUnique({ where: { id: board_id } });
};

export const updateBoard = async (
  userId,
  title,
  cover_image,
  intro,
  board_id
) => {
  return await prismaClient.boards.update({
    where: {
      id: board_id,
    },
    data: {
      title,
      cover_image_url: cover_image,
      intro,
    },
  });
};
