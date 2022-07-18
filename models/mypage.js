import prismaClient from './prisma-client.js';

export async function readMyPage(keyword, pageNumber) {
  const mypage = await prismaClient.$queryRawUnsafe(`
  
  `);

  return mypage;
}
