import * as recentSearchService from '../services/recent-search.js';

export const serchList = async (req, res) => {
  try {
    let { id } = req.params;
    const keywords = await recentSearchService.serchList(id);
    res.status(200).json(keywords);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};
