import express from 'express';
import * as boardController from '../controllers/board.js';
//import { isLogin } from '../middleware/auth.js';
const router = express.Router();
//router.use(isLogin);

router.post('/board', boardController.createBoard);
router.put('/board', boardController.updateBoard);

router.delete('/board/:board_id', boardController.deleteBoard);

export default router;
