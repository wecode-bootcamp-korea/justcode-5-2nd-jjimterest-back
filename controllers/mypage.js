import * as myPageService from '../services/mypage.js';

export const readEditProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const mypage = await myPageService.readEditProfile(userId);
    res.status(200).json(mypage);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const readAccountSettings = async (req, res) => {
  try {
    const userId = req.userId;

    const accountSettings = await myPageService.readAccountSettings(userId);
    res.status(200).json(accountSettings);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
