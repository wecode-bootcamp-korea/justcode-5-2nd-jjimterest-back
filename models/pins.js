import prismaClient from './prisma-client.js';

export async function pinList() {
  const pins = await prismaClient.$queryRaw`
  SELECT pins.id AS pin_id, pins.user_id, users.nickname, users.profile_image, pins.image, pins.created_at
  FROM pins
  JOIN users on pins.user_id = users.id
  ORDER BY created_at desc;
`;
  return pins;
}
