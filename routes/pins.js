import express from 'express';
import * as pinsController from '../controllers/pins.js';
const router = express.Router();

router.get('/pins', pinsController.pinList);

export default router;
