import * as recentSearchModels from '../models/recent-search.js';

export async function serchList(id) {
  const keywords = await recentSearchModels.serchList(id);
  console.log('recentSearchService - keywords : ', keywords);
  return keywords;
}
