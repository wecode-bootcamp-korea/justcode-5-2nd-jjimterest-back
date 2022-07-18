import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { isLogin } from '../middleware/auth.js';

router.use(isLogin);
router.get('/pins', myPageController.readMyPage);

const router = express.Router();
