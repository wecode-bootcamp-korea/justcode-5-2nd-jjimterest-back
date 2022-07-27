import * as pinsModels from '../models/pins.js';

export async function pinList(keyword, userId, pageNumber, isSearch) {
  const pins = await pinsModels.pinList(keyword, pageNumber);

  if (keyword && JSON.parse(isSearch)) {
    await pinsModels.insertKeyword(keyword, userId);
  }

  return pins;
}

export const readPinById = async (pinId, userId) => {
  const pin = await pinsModels.readPinById(pinId, userId);
  if (!!!pin.length) {
    const error = new Error('해당 핀이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  return pin;
};

export const savePin = async (pinId, userId) => {
  const pin = await pinsModels.readPinsById(pinId);
  const checkUnboardPin = await pinsModels.readUnboardPinByPinIdAndUserId(
    pinId,
    userId
  );
  if (Boolean(checkUnboardPin.length)) {
    const error = new Error('이미 저장되어 있습니다.');
    error.statusCode = 400;
    throw error;
  }
  if (!Boolean(pin)) {
    const error = new Error('해당 핀이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }
  return await pinsModels.createUnboardPin(pinId, userId);
};

export async function organizePins(userId, pinId, boardId) {
  /*console.log('userId', userId);
  console.log('pinId', pinId);
  console.log('boardId', boardId);*/
  await pinsModels.organizePins(userId, pinId, boardId);
}

export async function readMakePinPage(userId) {
  const makePinPage = await pinsModels.readMakePinPage(userId);

  return makePinPage;
}

export async function createPin(
  userId,
  title,
  intro,
  alt,
  category,
  image,
  boardId
) {
  if (!category) {
    const error = new Error('카테고리를 입력해주세요');
    error.statusCode = 400;
    throw error;
  }

  const result = await pinsModels.createPin(
    userId,
    title,
    intro,
    alt,
    category,
    image
  );

  let pinId = result.id;

  await pinsModels.createBoardStore(boardId, pinId);
}
