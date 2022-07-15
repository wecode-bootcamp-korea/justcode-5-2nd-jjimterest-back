import * as pinMakeModels from '../models/pin-make.js';

export async function readMakePinPage(userId) {
  const makePinPage = await pinMakeModels.readMakePinPage(userId);

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
  const result = await pinMakeModels.createPin(
    userId,
    title,
    intro,
    alt,
    category,
    image
  );

  let pinId = result.id;

  await pinMakeModels.createBoardStore(boardId, pinId);
}
