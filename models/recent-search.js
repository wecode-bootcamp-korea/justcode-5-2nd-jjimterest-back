import prismaClient from './prisma-client.js';

export async function serchList(id) {
  const keywords = await prismaClient.$queryRaw`
  SELECT keyword, created_at
  FROM recent_search 
  WHERE user_id = ${id}
  ORDER BY created_at desc
  Limit 5;
`;
  return keywords;
}
