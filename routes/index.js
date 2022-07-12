import express from 'express';
import userRouter from './user.js';
import pinsRouter from './pins.js';

const router = express.Router();
router.use(userRouter);
router.use(pinsRouter);

export default router;
