import express from 'express';
import * as pinsController from '../controllers/pins.js';
import * as pinsMakeController from '../controllers/pin-make.js';
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

router.get('/pins', pinsController.pinList);
router.get('/pins/:pin_id', pinsController.readPinById);
router.post('/pins/:pin_id', pinsController.savePin);
router.get('/pin-make', pinsMakeController.readMakePinPage);
router.post('/pin-make', upload.single('image'), pinsMakeController.createPin);

export default router;
