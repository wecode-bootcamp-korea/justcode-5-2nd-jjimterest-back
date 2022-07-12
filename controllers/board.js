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
