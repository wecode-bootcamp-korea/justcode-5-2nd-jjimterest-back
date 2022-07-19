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

export const updateBoardStoreById = async (oldBoardId, newBoardId) => {
  return prismaClient.$transaction([
    prismaClient.board_store.updateMany({
      where: { board_id: Number(oldBoardId) },
      data: { board_id: Number(newBoardId) },
    }),
    prismaClient.boards.delete({
      where: {
        id: Number(oldBoardId),
      },
    }),
  ]);
};

// 유저 프로필 - 보드 정렬 (알파벳순)
export const readBoardListBySorting = async (userId, sort) => {
  return await prismaClient.$queryRawUnsafe(`
  SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pin_board.id,'title',pin_board.title,'pins',pin_board.pins)) boards
  FROM (SELECT boards.id, boards.title,JSON_ARRAYAGG(CASE WHEN pins.id IS NOT NULL THEN JSON_OBJECT('pin_id',pins.id,'image',pins.image) END) pins 
  FROM boards LEFT JOIN board_store ON boards.id = board_store.board_id LEFT JOIN pins ON board_store.pin_id = pins.id 
  WHERE boards.user_id=${userId} GROUP BY boards.id order by title) pin_board;
  `);
};
