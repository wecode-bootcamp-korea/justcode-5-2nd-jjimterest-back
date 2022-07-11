import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/users/signup', userController.signUp);

export default router;
