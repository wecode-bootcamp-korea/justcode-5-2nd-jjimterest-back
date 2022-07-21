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
  if (!category) {
    const error = new Error('카테고리를 입력해주세요');
    error.statusCode = 400;
    throw error;
  }

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
