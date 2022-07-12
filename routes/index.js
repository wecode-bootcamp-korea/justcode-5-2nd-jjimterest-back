import express from 'express';
import userRouter from './user.js';
import boardRouter from './board.js';
import recentSearchRouter from './recent-search.js';

const router = express.Router();
router.use(userRouter);
router.use(recentSearchRouter);
router.use(boardRouter);

export default router;
