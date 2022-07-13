import * as commentsService from '../services/comments.js';

export const createComment = async (req, res) => {
  try {
    const parentId = req.body.parent_id;
    const userId = req.userId;
    const pinId = req.body.pin_id;
    const content = req.body.content;
    await commentsService.createComment(userId, parentId, pinId, content);
    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
