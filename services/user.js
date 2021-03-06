import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';
import * as userRepository from '../models/user.js';

export const signUp = async body => {
  const { email, password } = body;
  const nickname = body.nickname ? body.nickname : body.email.split('@')[0];
  const name = body.name ? body.name : body.email.split('@')[0];
  const user = await userRepository.readUserByEmail(email);
  if (user) {
    const error = new Error('EXISTING_USER');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const createUser = await userRepository.createUser(
    email,
    hash,
    nickname,
    name
  );

  return createUser;
};

export const login = async body => {
  const { email, password } = body;
  const user = await userRepository.readUserByEmail(email);
  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  return token;
};

export const kakaoLogin = async code => {
  const userInfo = await getKakaoToken(code);
  const email = userInfo.data.kakao_account.email;
  const nickname = userInfo.data.properties.nickname;
  const profileImage = userInfo.data.kakao_account.profile.profile_image_url;
  const id = userInfo.data.id;
  const user = await userRepository.readUserByEmail(email);
  const socialUser = await userRepository.readUserBySocialId(id);

  if (user && !socialUser) {
    await userRepository.createSocialUser(id, user.id);
    if (!user.profile_image) {
      await userRepository.updateUserProfileImageById(user.id, profileImage);
    }
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY);
    return token;
  }
  if (!user) {
    return await kakaoSignUp(email, nickname, profileImage, id);
  }
  if (socialUser) {
    const token = jwt.sign({ id: socialUser.user_id }, process.env.SECRET_KEY);
    return token;
  }
};

const kakaoSignUp = async (email, nickname, profileImage, id) => {
  const result = await userRepository.createUser(
    email,
    null,
    nickname,
    nickname,
    profileImage
  );
  await userRepository.createSocialUser(id, result.id);
  const token = jwt.sign({ id: result.id }, process.env.SECRET_KEY);
  return token;
};

const getKakaoToken = async code => {
  const tokenUrl = `https://kauth.kakao.com/oauth/token`;
  let accessToken;
  try {
    const result = await axios({
      method: 'POST',
      url: tokenUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        code,
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
      },
    });
    accessToken = result.data.access_token;
  } catch (error) {
    throw error;
  }
  const userInfo = await getUserInfoByToken(accessToken);
  return userInfo;
};

const getUserInfoByToken = async accessToken => {
  let userInfo = await axios({
    method: 'GET',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return userInfo;
};

export const getUserInfoByUserId = async (userId, name) => {
  const profileUserId = await userRepository.getUserId(name);
  if (!Boolean(profileUserId)) {
    const error = new Error('?????? ????????? ???????????? ????????????.');
    error.statusCode = 404;
    throw error;
  }

  if (profileUserId.id === userId) {
    const [info] = await userRepository.getUserInfoByUserId(userId);

    info.boards = info.boards
      ? info.boards.map(board => {
          return { ...board, pins: board.pins.filter(Boolean) };
        })
      : [];
    info.no_idea_pins = info.no_idea_pins ? info.no_idea_pins : [];
    info.all_pins = info.all_pins ? info.all_pins : [];
    info.following = info.following ? info.following : [];
    info.follower = info.follower ? info.follower : [];
    const result = { ...info, isMine: true };
    return result;
  }
  const [info] = await userRepository.getUserInfoByUserId(
    userId,
    profileUserId.id
  );

  info.boards = info.boards
    ? info.boards.map(board => {
        return { ...board, pins: board.pins.filter(Boolean) };
      })
    : [];
  info.no_idea_pins = info.no_idea_pins ? info.no_idea_pins : [];
  info.all_pins = info.all_pins ? info.all_pins : [];
  info.following = info.following ? info.following : [];
  info.follower = info.follower ? info.follower : [];
  const result = {
    ...info,
    isMine: false,
    isFollowing: Boolean(info.isFollowing),
  };
  return result;
};
