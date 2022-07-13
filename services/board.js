import * as boardRepository from '../models/board.js';

export const createBoard = async (userId, title) => {
  return await boardRepository.createBoard(userId, title);
};

export const deleteBoard = async (userId, boardId) => {
  const board = await boardRepository.readBoardById(boardId);
  if (!board) {
    const error = new Error('해당 보드가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  if (board.user_id !== userId) {
    const error = new Error('해당 보드를 삭제할 권한이 없습니다.');
    error.statusCod = 400;
    throw error;
  }

  return await boardRepository.deleteBoard(boardId);
};

export const updateBoard = async (userId, info) => {
  const { title, cover_image, intro, board_id } = info;
  const board = await boardRepository.readBoardById(board_id);
  if (!board) {
    const error = new Error('해당 보드가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  if (board.user_id !== userId) {
    const error = new Error('해당 보드를 수정할 권한이 없습니다.');
    error.statusCod = 400;
    throw error;
  }
  if (!title) {
    const error = new Error('제목을 입력해주세요.');
    error.statusCode = 400;
    throw error;
  } else {
    return await boardRepository.updateBoard(
      userId,
      title,
      cover_image,
      intro,
      board_id
    );
  }
};
