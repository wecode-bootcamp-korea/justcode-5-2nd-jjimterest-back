import * as followService from '../services/follow-unfollow.js';

export const clickFollowBtn = async (req, res) => {
  try {
    const userId = req.userId;
    const followeeId = req.query.followee_id;
    console.log('userId : ', userId);
    console.log('followeeId : ', followeeId);

    await followService.clickFollowBtn(userId, followeeId);

    res.status(201).json({ message: 'CLICK_SUCCESS' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
