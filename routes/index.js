import express from 'express';
import userRouter from './user.js';
import pinsRouter from './pins.js';
import boardRouter from './board.js';

const router = express.Router();
router.use(userRouter);
router.use(pinsRouter);
router.use(boardRouter);

export default router;
