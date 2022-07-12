import express from 'express';
import * as boardController from '../controllers/board.js';

const router = express.Router();

router.post('/board');

export default router;
