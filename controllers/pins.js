import * as pinsService from '../services/pins.js';

export const pinList = async (req, res) => {
  try {
    let keyword = req.query.keyword;
    const userId = req.userId;
    let pageNumber = req.query.pagenumber;
    let isSearch = req.query.isSearch;

    const pins = await pinsService.pinList(
      keyword,
      userId,
      pageNumber,
      isSearch
    );
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const readPinById = async (req, res) => {
  try {
    const pinId = req.params.pin_id;
    const userId = req.userId;
    const pin = await pinsService.readPinById(pinId, userId);
    const result = JSON.parse(
      JSON.stringify(
        pin,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const savePin = async (req, res) => {
  try {
    const pinId = req.params.pin_id;
    const userId = req.userId;
    await pinsService.savePin(pinId, userId);
    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const organizePins = async (req, res) => {
  try {
    const userId = req.userId;
    const pinId = req.body.pin_id;
    const boardId = req.body.board_id;

    for (var i = 0; i < pinId.length; i++) {
      await pinsService.organizePins(userId, pinId[i], boardId);
    }

    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const readMakePinPage = async (req, res) => {
  try {
    const userId = req.userId;
    const makePinPage = await pinsService.readMakePinPage(userId);
    const result = JSON.parse(
      JSON.stringify(
        makePinPage,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPin = async (req, res) => {
  try {
    const userId = req.userId;
    const title = req.body.title;
    const intro = req.body.intro;
    const alt = req.body.alt;
    const category = req.body.category;
    const image = req.file.filename;
    const boardId = req.body.boardId;

    await pinsService.createPin(
      userId,
      title,
      intro,
      alt,
      category,
      image,
      boardId
    );
    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
