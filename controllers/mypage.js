import * as myPageService from '../services/mypage.js';

// 공개 프로필 수정 페이지 불러오기
export const readEditProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const mypage = await myPageService.readEditProfile(userId);
    res.status(200).json(mypage);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// 프로필 사진, 이름, 소개, 닉네임 변경
export async function updateProfile(req, res) {
  try {
    const { name, intro, nickname } = req.body;
    const userId = req.userId;
    await myPageService.updateProfile({
      userId,
      name,
      intro,
      nickname,
    });
    res.status(200).json({ message: '프로필 수정 성공' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

// 비밀번호 변경 페이지 불러오기
export const readAccountSettings = async (req, res) => {
  try {
    const userId = req.userId;

    const accountSettings = await myPageService.readAccountSettings(userId);
    res.status(200).json(accountSettings);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// 비밀번호 변경
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
