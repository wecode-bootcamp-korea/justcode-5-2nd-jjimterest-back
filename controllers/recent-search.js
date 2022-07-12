import * as recentSearchService from '../services/recent-search.js';

export const serchList = async (req, res) => {
  try {
    let { id } = req.params;
    console.log('id : ', id);
    const keywords = await recentSearchService.serchList(id);
    console.log('recentSearchController - keywords : ', keywords);
    res.status(200).json(keywords);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};
