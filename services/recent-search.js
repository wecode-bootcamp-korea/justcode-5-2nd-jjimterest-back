import * as recentSearchModels from '../models/recent-search.js';

export async function serchList() {
  const keywords = await recentSearchModels.serchList();
  return keywords;
}
