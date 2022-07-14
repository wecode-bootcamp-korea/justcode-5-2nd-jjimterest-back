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
