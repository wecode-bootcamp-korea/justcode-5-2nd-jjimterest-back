import * as pinsOrganizeModels from '../models/pin-organize.js';

export async function organizePins(userId, pinId, boardId) {
  await pinsOrganizeModels.organizePins(userId, pinId, boardId);
}
