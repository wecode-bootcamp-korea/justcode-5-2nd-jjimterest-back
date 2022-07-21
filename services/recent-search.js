import * as recentSearchModels from '../models/recent-search.js';

export async function serchList(userId) {
  const keywords = await recentSearchModels.serchList(userId);

  if (keywords.length === 0) {
    const error = new Error('최근 검색한 키워드가 없습니다.');
    error.statusCode = 404;
    throw error;
  }

  return keywords;
}
