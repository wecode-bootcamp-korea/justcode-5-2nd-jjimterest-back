import express from 'express';
import userRouter from './user.js';
import boardRouter from './board.js';

const router = express.Router();
router.use(userRouter);
router.use(boardRouter);

export default router;
