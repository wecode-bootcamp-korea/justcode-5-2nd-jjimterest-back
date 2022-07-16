import * as recentSearchModels from '../models/recent-search.js';

export async function serchList(userId) {
  const keywords = await recentSearchModels.serchList(userId);
  return keywords;
}

export async function deleteAllSerchList(userId) {
  await recentSearchModels.deleteAllSerchList(userId);
}
