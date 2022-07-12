import * as boardRepository from '../models/board.js';

export const createBoard = async (userId, title) => {
  return await boardRepository.createBoard(userId, title);
};
