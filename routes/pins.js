import express from 'express';
import * as pinsController from '../controllers/pins.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);

router.get('/pins', pinsController.pinList);
router.get('/pins/:pin_id', pinsController.readPinById);
router.post('/pins/:pin_id', pinsController.savePin);

export default router;
