import prismaClient from './prisma-client.js';

export async function pinList(keyword) {
  const pins = await prismaClient.$queryRawUnsafe(`
  SELECT pins.id AS pin_id, pins.user_id, users.nickname, users.profile_image, pins.image, pins.created_at
  FROM pins
  JOIN users on pins.user_id = users.id
  ${keyword ? `WHERE category LIKE '%${keyword}%'` : ``}
  ORDER BY created_at desc;
`);
  return pins;
}

export const readPinById = async (pinId, userId) => {
  const pin = await prismaClient.$queryRawUnsafe(`
  SELECT pins.id, user.nickname,user.count,pins.title, pins.intro, pins.image, comments.comments
from pins join (SELECT
                    pin_id,
                    JSON_ARRAYAGG(CASE WHEN comments.id IS NOT NULL THEN JSON_OBJECT('id',comments.id,'parent_id',comments.parent_id,'profile_image',comment_user.profile_image,'user_id',comment_user.id,'created_at',comments.created_at,'like_count',cl.like_count ${
                      userId
                        ? `,'isLike',IFNULL((SELECT isLike from comment_like where user_id=17 and comment_like.comment_id=comments.id),0)`
                        : ``
                    }) END) comments
                from comments join (SELECT id,profile_image,nickname from users) comment_user on comments.user_id=comment_user.id join (SELECT comment_id,COUNT(*) like_count from comment_like where isLike=true group by comment_id) cl on comments.id=cl.comment_id where pin_id=6) comments on pins.id = comments.pin_id
join (SELECT id, nickname,following.count from users join (SELECT followee_id,COUNT(*) count from followings group by followee_id) following) user on pins.user_id=user.id
where pins.id=${pinId}
group by pin_id,user.count;
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
