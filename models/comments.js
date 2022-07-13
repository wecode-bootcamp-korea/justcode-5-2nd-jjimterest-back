import prismaClient from './prisma-client.js';

export const createComment = async (userId, parentId, pinId, content) => {
  await prismaClient.$queryRaw`
  INSERT INTO comments (user_id,parent_id,pin_id,content) VALUES (${userId},${parentId},${Number(
    pinId
  )},${content})`;
};

export const readCommentsById = async commentId => {
  return await prismaClient.$queryRaw`
  SELECT * FROM comments WHERE id=${commentId};
  `;
};

export const updateComment = async (commentId, content) => {
  return await prismaClient.$queryRaw`
  UPDATE comments SET content=${content} WHERE id=${commentId}
  `;
};
