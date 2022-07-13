import * as commentsRepository from '../models/comments.js';
import * as pinsRepositroy from '../models/pins.js';

export const createComment = async (userId, parentId, pinId, content) => {
  const pin = await pinsRepositroy.readPinById(pinId);
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
