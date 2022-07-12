import * as pinsController from '../models/pins.js';

export async function pinList() {
  const pins = await pinsController.pinList();
  return pins;
}
