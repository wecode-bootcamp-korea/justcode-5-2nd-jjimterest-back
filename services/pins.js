import * as pinsModels from '../models/pins.js';

export async function pinList() {
  const pins = await pinsModels.pinList();
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
