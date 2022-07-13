import express from 'express';
import userRouter from './user.js';
import pinsRouter from './pins.js';
import boardRouter from './board.js';
import recentSearchRouter from './recent-search.js';
import searchRouter from './search.js';

const router = express.Router();
router.use(pinsRouter);
router.use(userRouter);
router.use(boardRouter);
router.use(searchRouter);

export default router;
