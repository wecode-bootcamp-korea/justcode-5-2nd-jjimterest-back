import * as myPageModels from '../models/mypage.js';

export async function readEditProfile(userId) {
  const mypage = await myPageModels.readEditProfile(userId);

  return mypage;
}

export async function readAccountSettings(userId) {
  const accountSettings = await myPageModels.readAccountSettings(userId);

  return accountSettings;
}
