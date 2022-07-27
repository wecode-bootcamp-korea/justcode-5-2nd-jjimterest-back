import express from 'express';
import socketConfig from '../connection/socket.js';
import { isLogin } from '../middleware/auth.js';

const router = express.Router();

export default router;
