import express from 'express';
import * as commentsController from '../controllers/comments.js';
import { isLogin } from '../middleware/auth.js';

const router = express.Router();
router.use(isLogin);

router.post('/comments', commentsController.createComment);
router.put('/comments', commentsController.updateComment);
router.post('/comments/:comment_id/like', commentsController.likeComment);
router.delete('/comments/:comment_id', commentsController.deleteComment);

export default router;
