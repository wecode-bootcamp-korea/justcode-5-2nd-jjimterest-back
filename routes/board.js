import express from 'express';
import * as boardController from '../controllers/board.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();
router.use(isLogin);

router.post('/board', boardController.createBoard);
router.put('/board', boardController.updateBoard);
router.put('/board/:board_id', boardController.mergeBoard);
router.get('/board/:board_id', boardController.readBoardDetailById);
router.delete('/board/:board_id', boardController.deleteBoard);

// 유저 프로필 - 보드 정렬 : 알파벳순 or 마지막 저장일 순
router.get('/board', boardController.readBoardListBySorting);

export default router;
