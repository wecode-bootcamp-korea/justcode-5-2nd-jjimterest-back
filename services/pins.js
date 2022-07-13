import * as pinsModels from '../models/pins.js';

export async function pinList() {
  const pins = await pinsModels.pinList();
  return pins;
}
