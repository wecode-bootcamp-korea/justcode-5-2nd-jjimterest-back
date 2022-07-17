import prismaClient from './prisma-client.js';

// 로그인 되어있는 user id가 프론트에서 넘겨준 상대방(user_id)를 팔로우 하고 있는지 확인
export const isFollow = async (userId, followeeId) => {
  const [{ isFollow }] = await prismaClient.$queryRaw`
    SELECT EXISTS
    (
      SELECT
        *
      FROM
        followings
      WHERE
        follower_id=${userId}
      AND
        followee_id=${followeeId}
    ) AS isFollow
  `;

  return !!isFollow;
};

// 팔로우
export const createFollow = async (userId, followeeId) => {
  await prismaClient.$queryRaw`
  INSERT INTO followings (followee_id, follower_id) VALUES (${followeeId}, ${userId});
  `;
};

// 언팔로우
export const deleteFollow = async (userId, followeeId) => {
  await prismaClient.$queryRaw`
  DELETE FROM followings 
  WHERE followee_id = ${followeeId}
  AND follower_id = ${userId}
  `;
};
