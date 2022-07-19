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

export const updatePassword = async (req, res) => {
  try {
    const { current_password, new_password, confirm_new_password } = req.body;
    const userId = req.userId;
    console.log(current_password, new_password, confirm_new_password, userId);
    await myPageService.updatePassword(
      userId,
      current_password,
      new_password,
      confirm_new_password
    );
    res.status(200).json({ message: '비밀번호가 변경되었습니다.' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
