import * as followModels from '../models/follow-unfollow.js';

export const clickFollow = async (userId, followeeId) => {
  const isFollow = await followModels.isFollow(userId, followeeId);

  if (isFollow) {
    console.log('팔로우중');
  } else {
    console.log('팔로우중이 아닙니다');
  }
};
