import * as pinsModels from '../models/pins.js';

export async function pinList(keyword) {
  const pins = await pinsModels.pinList(keyword);
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
