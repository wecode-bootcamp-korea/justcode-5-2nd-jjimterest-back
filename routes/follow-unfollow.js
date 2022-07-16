import express from 'express';
import * as followController from '../controllers/follow-unfollow.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);

router.post('/follow', followController.clickFollow);

export default router;
