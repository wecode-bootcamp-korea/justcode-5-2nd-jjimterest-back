import prismaClient from './prisma-client.js';

// pin list (20개씩)
export async function pinList(keyword, pageNumber) {
  const pins = await prismaClient.$queryRawUnsafe(`
  SELECT pins.id AS pin_id, pins.user_id, users.nickname, users.profile_image, pins.image, pins.created_at, pins.category
  FROM pins
  JOIN users on pins.user_id = users.id
  ${keyword ? `WHERE category LIKE '%${keyword}%'` : ``}
  ORDER BY created_at desc
  LIMIT 20 OFFSET ${(Number(pageNumber) - 1) * 20};
`);
  return pins;
}

export async function insertKeyword(keyword, userId) {
  return prismaClient.$queryRaw`
  Insert Into recent_search(user_id, keyword)
  VALUES (${userId}, ${keyword})`;
}

export const readPinById = async (pinId, userId) => {
  const pin = await prismaClient.$queryRawUnsafe(`
  SELECT pins.id, user.nickname,user.count,pins.title, user.profile_image,pins.intro, pins.image, comments.comments
  from pins LEFT JOIN (SELECT
                      pin_id,
                      JSON_ARRAYAGG(CASE WHEN comments.id IS NOT NULL THEN JSON_OBJECT('id',comments.id,'nickname',comment_user.nickname,'content',comments.content,'parent_id',comments.parent_id,'profile_image',comment_user.profile_image,'user_id',comment_user.id,'created_at',comments.created_at,'like_count',cl.like_count ,'isLike',IFNULL(
                        (SELECT isLike
                          from comment_like
                        where user_id=${userId} and comment_like.comment_id=comments.id),0)) END) comments
                  FROM comments join (SELECT id,profile_image,nickname from users) comment_user on comments.user_id=comment_user.id LEFT join (SELECT comment_id,COUNT(*) like_count from comment_like where isLike=true group by comment_id) cl on comments.id=cl.comment_id where pin_id=${pinId} ORDER BY created_at) comments on pins.id = comments.pin_id
  LEFT JOIN (SELECT id, nickname,profile_image,following.count from users LEFT JOIN (SELECT followee_id,COUNT(*) count from followings  group by followee_id) following ON followee_id=id) user on pins.user_id=user.id
  where pins.id=${pinId};
  `);
  return pin;
};

export const readPinsById = async pinId => {
  return await prismaClient.pins.findUnique({ where: { id: Number(pinId) } });
};

export const readUnboardPinByPinIdAndUserId = async (pinId, userId) => {
  return await prismaClient.$queryRaw`
  SELECT * FROM unboard_pin WHERE user_id=${Number(userId)} AND pin_id=${Number(
    pinId
  )}
  `;
};

export const createUnboardPin = async (pinId, userId) => {
  return await prismaClient.unboard_pin.create({
    data: {
      user_id: Number(userId),
      pin_id: Number(pinId),
    },
  });
};
