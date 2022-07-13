import express from 'express';
import * as boardController from '../controllers/board.js';
//import { isLogin } from '../middleware/auth.js';
const router = express.Router();
//router.use(isLogin);

router.post('/board', boardController.createBoard);

export default router;
