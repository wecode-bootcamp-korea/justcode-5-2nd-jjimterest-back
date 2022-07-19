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

export const readBoardDetailById = async (req, res) => {
  try {
    const boardId = Number(req.params.board_id);
    const userId = req.userId;
    const data = await boardService.readBoardDetailById(boardId, userId);
    res.status(200).json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const mergeBoard = async (req, res) => {
  try {
    const oldBoardId = req.params.board_id;
    const newBoardId = req.body.new_board_id;
    const userId = req.userId;
    await boardService.mergeBoard(oldBoardId, newBoardId, userId);
    res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// 유저 프로필 - 보드 정렬
export const readBoardListBySorting = async (req, res) => {
  try {
    const userId = req.userId;
    let sort = req.query.sort;
    console.log('컨트롤러 userId : ', userId, 'sort : ', sort);

    const boards = await boardService.readBoardListBySorting(userId, sort);
    res.status(200).json(boards);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};
