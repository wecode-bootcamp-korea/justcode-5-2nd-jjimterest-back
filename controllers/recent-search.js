import * as recentSearchService from '../services/recent-search.js';

export const serchList = async (req, res) => {
  try {
    const userId = req.userId;
    const keywords = await recentSearchService.serchList(userId);
    res.status(200).json(keywords);
  } catch (error) {
    console.log(error);

    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
