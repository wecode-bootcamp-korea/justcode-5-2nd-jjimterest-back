import express from 'express';
import * as pinsController from '../controllers/pins.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);

router.get('/pins', pinsController.pinList);
router.get('/pins/:pins_id', pinsController.readPinById);

export default router;
