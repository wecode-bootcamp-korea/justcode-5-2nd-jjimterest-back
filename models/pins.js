import prismaClient from './prisma-client.js';

export async function pinList() {
  const pins = await prismaClient.$queryRaw`
  SELECT 
      id AS pin_id, user_id, image
    FROM pins`;
  return pins;
}
