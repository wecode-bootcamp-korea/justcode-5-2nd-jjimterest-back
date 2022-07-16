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

export const updateBoard = async (title, cover_image, intro, board_id) => {
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

export const readBoardDetailById = async boardId => {
  return await prismaClient.$queryRaw`
  SELECT boards.id, boards.title, boards.intro, p.pins
  FROM boards LEFT JOIN (SELECT board_id, JSON_ARRAYAGG(JSON_OBJECT('pin_id',pins.id,'image',pins.image)) pins FROM board_store LEFT JOIN pins ON board_store.pin_id = pins.id  GROUP BY board_id) p
  ON p.board_id = boards.id
  WHERE boards.id=${boardId};
  `;
};
