import prismaClient from './prisma-client.js';

export const createComment = async (userId, parentId, pinId, content) => {
  await prismaClient.$queryRaw`
  INSERT INTO comments (user_id,parent_id,pin_id,content) VALUES (${userId},${parentId},${Number(
    pinId
  )},${content})`;
};
