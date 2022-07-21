import prismaClient from './prisma-client.js';

export async function serchList(userId) {
  const keywords = await prismaClient.$queryRaw`
  SELECT keyword, created_at
  FROM recent_search 
  WHERE user_id = ${userId}
  ORDER BY created_at desc
  Limit 5;
`;

  return keywords;
}
