import express from 'express';
import * as followController from '../controllers/follow-unfollow.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);

router.post('/follow', followController.createFollow);
router.get('/follow/:user_id', followController.selectFollow);

export default router;
