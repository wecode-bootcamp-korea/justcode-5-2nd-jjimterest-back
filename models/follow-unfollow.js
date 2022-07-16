import prismaClient from './prisma-client.js';

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
