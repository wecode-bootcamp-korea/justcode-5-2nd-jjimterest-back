import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.js';
import { validate } from '../middleware/validator.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

const validateCredential = [
  body('email')
    .notEmpty()
    .withMessage('이메일을 입력해주세요.')
    .trim()
    .isEmail()
    .withMessage('이메일을 올바른 형식으로 입력해주세요.'),
  body('password')
    .notEmpty()
    .withMessage('비밀번호를 입력해주세요.')
    .trim()
    .matches(
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/
    )
    .withMessage('비밀번호를 올바른 형식으로 입력해주세요.'),
  validate,
];

router.post('/users/signup', validateCredential, userController.signUp);
router.post('/users/login', validateCredential, userController.login);

router.get('/kakao', userController.kakao);
router.get('/auth/kakao/callback', userController.kakaoLogin);
router.get('/profile/:name', isLogin, userController.getUserInfoByUserId);
export default router;
