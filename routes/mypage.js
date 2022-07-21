import express from 'express';
import * as myPageController from '../controllers/mypage.js';
import { isLogin } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

//uploads 폴더가 없을시 생성
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

router.use(isLogin);

// 공개 프로필 수정 페이지 (프로필 사진, 이름, 소개, 닉네임 변경)
router.get('/edit-profile', myPageController.readEditProfile);
router.put(
  '/edit-profile',
  upload.single('image'),
  myPageController.updateProfile
);

// 계정 관리 페이지 (비밀번호 변경)
router.get('/account-settings', myPageController.readAccountSettings);
router.put('/account-settings', myPageController.updatePassword);

export default router;
