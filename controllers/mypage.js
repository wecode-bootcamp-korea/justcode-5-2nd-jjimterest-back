import * as myPageService from '../services/mypage.js';

export const readMyPage = async (req, res) => {
  try {
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
