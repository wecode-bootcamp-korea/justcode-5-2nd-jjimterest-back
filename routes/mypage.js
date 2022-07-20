import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();
router.use(isLogin);

// 공개 프로필 수정 페이지 (프로필 사진, 이름, 소개, 닉네임 수정하는 페이지)
router.get('/edit-profile', myPageController.readEditProfile);

// 계정 관리 페이지 (비밀번호 수정하는 페이지)
router.get('/account-settings', myPageController.readAccountSettings);
router.put('/account-settings', myPageController.updatePassword);

export default router;
