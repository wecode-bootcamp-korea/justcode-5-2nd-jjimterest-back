import express from 'express';
import userRouter from './user.js';
import pinsRouter from './pins.js';
import boardRouter from './board.js';
import recentSearchRouter from './recent-search.js';
import commentRouter from './comments.js';
import followRouter from './follow-unfollow.js';

const router = express.Router();
router.use(userRouter);
router.use(pinsRouter);
router.use(boardRouter);
router.use(recentSearchRouter);
router.use(commentRouter);
router.use(followRouter);

export default router;
