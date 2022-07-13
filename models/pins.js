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
