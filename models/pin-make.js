import prismaClient from './prisma-client.js';

export async function readMakePinPage(userId) {
  const makePinPage = await prismaClient.$queryRaw`
  SELECT boards.id as board_id, boards.title, boards.cover_image_url, users.name as user_name, COUNT(followings.follower_id) as follower_count
  FROM boards
  JOIN users on boards.user_id = users.id
  JOIN followings on users.id = followee_id
  WHERE boards.user_id = ${userId}
  GROUP BY boards.id;
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
