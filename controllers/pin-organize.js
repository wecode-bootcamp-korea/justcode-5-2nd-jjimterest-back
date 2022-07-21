import * as pinsOrganizeService from '../services/pin-organize.js';

export const organizePins = async (req, res) => {
  try {
    const userId = req.userId;
    const pinId = req.body.pin_id;
    const boardId = req.body.board_id;

    await pinsOrganizeService.organizePins(userId, pinId, boardId);
    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
