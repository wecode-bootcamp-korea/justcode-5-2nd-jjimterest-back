import * as myPageModels from '../models/mypage.js';

export async function readMyPage(userId) {
  const mypage = await myPageModels.readMyPage(userId);

  return mypage;
}
