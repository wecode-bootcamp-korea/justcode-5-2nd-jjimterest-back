import * as boardService from '../services/board.js';

export const createBoard = async (req, res) => {
  try {
    const userId = req.userId;
    const title = req.body.title;
    await boardService.createBoard(userId, title);
    return res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    return res.status(500).json({ message: 'FAIL' });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const userId = req.userId;
    const boardId = req.params.board_id;
    await boardService.deleteBoard(userId, boardId);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, cover_image, intro, board_id } = req.body;
    await boardService.updateBoard(userId, {
      title,
      cover_image: cover_image ? cover_image : null,
      intro: intro ? intro : null,
      board_id,
    });
    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
