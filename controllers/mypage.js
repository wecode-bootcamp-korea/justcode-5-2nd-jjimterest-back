import * as myPageService from '../services/mypage.js';

export const readMyPage = async (req, res) => {
  try {
    const userId = req.userId;

    const mypage = await myPageService.readMyPage();
    res.status(200).json(pins);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
