import * as pinsModels from '../models/pins.js';

export async function pinList(keyword) {
  const pins = await pinsModels.pinList(keyword);
  return pins;
}
