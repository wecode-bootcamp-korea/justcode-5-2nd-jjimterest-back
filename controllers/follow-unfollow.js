import * as followService from '../services/follow-unfollow.js';

export const createFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const followeeId = req.query.followee_id;

    await followService.createFollow(userId, followeeId);

    res.status(201).json({ message: 'CLICK_SUCCESS' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const selectFollow = async (req, res) => {
  try {
    const userId = req.userId;
    const followeeId = req.params.user_id;

    const isFollow = await followService.selectFollow(userId, followeeId);

    res.status(200).json({ is_follow: isFollow });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
