import * as followModels from '../models/follow-unfollow.js';

export const createFollow = async (userId, followeeId) => {
  // 로그인 되어있는 user id가 프론트에서 넘겨준 상대방(user_id)를 팔로우 하고 있는지 확인해서
  const isFollow = await followModels.isFollow(userId, followeeId);

  if (isFollow) {
    // 팔로우중이라면 언팔로우
    return await followModels.deleteFollow(userId, followeeId);
  } else {
    // 팔로우중이 아니라면 팔로우
    return await followModels.createFollow(userId, followeeId);
  }
};

export const selectFollow = async (userId, followeeId) => {
  const isFollow = await followModels.isFollow(userId, followeeId);

  return isFollow;
};
