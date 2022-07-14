import * as pinMakeModels from '../models/pin-make.js';

export async function readMakePinPage(userId) {
  const makePinPage = await pinMakeModels.readMakePinPage(userId);

  return makePinPage;
}
