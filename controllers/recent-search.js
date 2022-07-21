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

export const deleteAllSerchList = async (req, res) => {
  try {
    const userId = req.userId;
    await recentSearchService.deleteAllSerchList(userId);
    return res.status(200).json({ message: 'DELETED' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
