import * as commentsRepository from '../models/comments.js';
import * as pinsRepositroy from '../models/pins.js';

export const createComment = async (userId, parentId, pinId, content) => {
  const pin = await pinsRepositroy.readPinById(pinId, userId);
  if (!Boolean(pin.length)) {
    const error = new Error('해당 핀이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  return await commentsRepository.createComment(
    userId,
    parentId,
    pinId,
    content
  );
};

export const updateComment = async (userId, commentId, content) => {
  const comment = await commentsRepository.readCommentById(commentId);
  if (!Boolean(comment.length)) {
    const error = new Error('해당 댓글이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  if (userId !== comment[0].user_id) {
    const error = new Error('해당 댓글을 수정할 권한이 없습니다.');
    error.statusCode = 403;
    throw error;
  }

  await commentsRepository.updateComment(commentId, content);
};

export const deleteComment = async (userId, commentId) => {
  const comment = await commentsRepository.readCommentById(commentId);
  if (!Boolean(comment.length)) {
    const error = new Error('해당 댓글이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  if (userId !== comment[0].user_id) {
    const error = new Error('해당 댓글을 삭제할 권한이 없습니다.');
    error.statusCode = 403;
    throw error;
  }

  await commentsRepository.deleteComment(commentId);
};

export const likeComment = async (userId, commentId) => {
  const comment = await commentsRepository.readCommentById(commentId);
  if (!Boolean(comment.length)) {
    const error = new Error('해당 댓글이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  const checkLike =
    await commentsRepository.readCommentsLikeBycommentIdAndUserId(
      userId,
      commentId
    );
  if (!Boolean(checkLike.length)) {
    await commentsRepository.createCommentLike(userId, commentId, true);
  } else {
    await commentsRepository.updateCommentLike(
      userId,
      commentId,
      !checkLike[0].isLike
    );
  }
  const [isLike] = await commentsRepository.getIsLike(userId, commentId);
  const [likeCount] = await commentsRepository.getCountofCommentLike(commentId);

  return [isLike.isLike, likeCount.like_count];
};
