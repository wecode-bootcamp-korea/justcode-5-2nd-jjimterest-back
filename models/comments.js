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

export const deleteComment = async commentId => {
  return await prismaClient.$queryRaw`
  DELETE FROM comments WHERE id=${commentId}
  `;
};

export const readCommentsLikeBycommentIdAndUserId = async (
  userId,
  commentId
) => {
  return await prismaClient.$queryRaw`
  SELECT * FROM comment_like WHERE user_id=${userId} AND comment_id=${commentId}
  `;
};

export const createCommentLike = async (userId, commentId, likeStatus) => {
  return await prismaClient.$queryRaw`
  INSERT INTO comment_like (user_id,comment_id,isLike) VALUES (${userId},${commentId},${likeStatus})
  `;
};

export const getCountofCommentLike = async commentId => {
  return await prismaClient.$queryRaw`
  SELECT COUNT(*) like_count FROM comment_like WHERE comment_id=${commentId} AND isLike=true
  `;
};

export const getIsLike = async (userId, commentId) => {
  return await prismaClient.$queryRaw`
  SELECT isLike FROM comment_like WHERE user_id=${userId} AND comment_id=${commentId}
  `;
};

export const updateCommentLike = async (userId, commentId, likeStatus) => {
  return await prismaClient.$queryRaw`
  UPDATE comment_like SET isLike=${likeStatus} WHERE comment_id=${commentId} AND user_id=${userId}
  `;
};
