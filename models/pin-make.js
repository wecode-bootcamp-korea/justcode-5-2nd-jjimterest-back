import prismaClient from './prisma-client.js';

export async function readMakePinPage(userId) {
  const makePinPage = await prismaClient.$queryRaw`
  select users.name, boards.follower_count,JSON_ARRAYAGG(JSON_OBJECT('board_id',boards.id,"title", boards.title,'cover_image_url',boards.cover_image_url)) boards
  from users
  LEFT JOIN (SELECT boards.id, boards.user_id, boards.title, boards.cover_image_url, boards.count follower_count
  FROM (SELECT boards.id, boards.user_id, boards.title, boards.cover_image_url, followings.count FROM boards LEFT JOIN (SELECT followee_id, COUNT(*) count FROM followings group by followee_id) followings ON boards.user_id=followings.followee_id WHERE boards.user_id=${userId} group by boards.id) boards
  GROUP BY boards.id) boards
  ON users.id=boards.user_id
  where users.id = ${userId}
  GROUP BY users.name
  `;
  return makePinPage;
}

export async function createPin(userId, title, intro, alt, category, image) {
  return await prismaClient.pins.create({
    data: {
      user_id: userId,
      title: title,
      intro: intro,
      alt: alt,
      category: category,
      image: image,
    },
  });
}

export async function createBoardStore(board_id, pinId) {
  return await prismaClient.board_store.create({
    data: {
      board_id: Number(board_id),
      pin_id: pinId,
    },
  });
}
