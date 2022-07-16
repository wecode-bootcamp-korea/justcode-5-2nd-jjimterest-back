import express from 'express';
import * as recentSearchController from '../controllers/recent-search.js';
import { isLogin } from '../middleware/auth.js';
const router = express.Router();

router.use(isLogin);

router.get('/recent-search', recentSearchController.serchList);
router.delete('/recent-search', recentSearchController.deleteAllSerchList);

export default router;
