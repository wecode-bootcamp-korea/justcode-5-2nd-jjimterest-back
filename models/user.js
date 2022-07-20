import { Prisma } from '@prisma/client';
import prismaClient from './prisma-client.js';

export const createUser = async (
  email,
  password,
  nickname,
  name,
  profileImage
) => {
  return await prismaClient.users.create({
    data: {
      email,
      password,
      nickname,
      name,
      profile_image: profileImage ? profileImage : null,
    },
  });
};

export const createSocialUser = async (id, userId) => {
  return await prismaClient.social_login.create({
    data: {
      social_id: String(id),
      user_id: userId,
    },
  });
};

export const readUserByEmail = async email => {
  return await prismaClient.users.findUnique({ where: { email } });
};

export const readUserBySocialId = async id => {
  return await prismaClient.social_login.findFirst({
    where: { social_id: String(id) },
  });
};

export const readUserById = async id => {
  return await prismaClient.users.findUnique({ where: { id } });
};

export const getUserInfoByUserId = async (userId, otherUserId) => {
  return await prismaClient.$queryRawUnsafe(`
  SELECT
  users.id,
  users.name,
  users.nickname,
  users.profile_image,
  followee.following,
  follower.follower,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',pin_board.id,'title',pin_board.title,'pins',pin_board.pins)) boards_array FROM (SELECT boards.id, boards.title,JSON_ARRAYAGG(CASE WHEN pins.id IS NOT NULL THEN JSON_OBJECT('pin_id',pins.id,'image',pins.image) END) pins FROM boards LEFT JOIN board_store ON boards.id = board_store.board_id LEFT JOIN pins ON board_store.pin_id = pins.id WHERE boards.user_id=${
    otherUserId ? otherUserId : userId
  } GROUP BY boards.id) pin_board) boards,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',p.pin_id,'image',p.image)) no_idea_pin FROM (SELECT pin_id, pins.image FROM unboard_pin LEFT JOIN pins ON unboard_pin.pin_id = pins.id WHERE unboard_pin.user_id=${
    otherUserId ? otherUserId : userId
  }) p) no_idea_pins,
  (SELECT JSON_MERGE(IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id',p.pin_id,'image',image)),'[]'), IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT('id',id,'image',image)) ps FROM pins WHERE user_id=${
    otherUserId ? otherUserId : userId
  }),'[]'))
  FROM (SELECT pin_id, pins.image FROM unboard_pin JOIN pins ON unboard_pin.pin_id = pins.id WHERE unboard_pin.user_id=${
    otherUserId ? otherUserId : userId
  }) p) all_pins,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',id,'image',image)) ps FROM pins WHERE user_id=${
    otherUserId ? otherUserId : userId
  }) my_pins
${
  otherUserId && userId !== otherUserId
    ? `,IFNULL(CASE WHEN (SELECT id FROM followings WHERE follower_id=${otherUserId} AND followee_id=${userId}) IS NOT NULL THEN 1 END,0) isFollowing`
    : ``
}
FROM users
LEFT JOIN (SELECT followee_id, JSON_ARRAYAGG(JSON_OBJECT('id',followings.follower_id,'profile_image',users.profile_image,'nickname',users.nickname)) following
      FROM followings JOIN users ON followings.follower_id = users.id
    WHERE followee_id=${
      otherUserId ? otherUserId : userId
    } GROUP BY followee_id) followee
ON users.id = followee.followee_id
LEFT JOIN (SELECT follower_id, JSON_ARRAYAGG(JSON_OBJECT('id',followings.followee_id,'profile_image',users.profile_image,'nickname',users.nickname)) follower
      FROM followings JOIN users ON followings.followee_id = users.id
    WHERE follower_id=${
      otherUserId ? otherUserId : userId
    } GROUP BY follower_id) follower
ON users.id = follower.follower_id
WHERE users.id=${otherUserId ? otherUserId : userId}
  `);
};

export const getUserId = async name => {
  return await prismaClient.users.findUnique({
    where: { name },
  });
};

export const updateUserProfileImageById = async (userId, profileImage) => {
  return await prismaClient.$queryRaw`UPDATE users SET profile_image=${profileImage} WHERE id=${userId}`;
};
