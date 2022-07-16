import * as followModels from '../models/follow-unfollow.js';

export const clickFollowBtn = async (userId, followeeId) => {
  // 로그인 되어있는 user id가 프론트에서 넘겨준 상대방(user_id)를 팔로우 하고 있는지 확인해서
  const isFollow = await followModels.isFollow(userId, followeeId);

  if (isFollow) {
    console.log('팔로우중');
    // 팔로우중이라면 언팔로우
    return await followModels.deleteFollow(userId, followeeId);
  } else {
    console.log('팔로우중이 아닙니다');
    // 팔로우중이 아니라면 팔로우
    return await followModels.createFollow(userId, followeeId);
  }
};
