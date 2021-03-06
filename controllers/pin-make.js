import * as pinMakeService from '../services/pin-make.js';

export const readMakePinPage = async (req, res) => {
  try {
    const userId = req.userId;
    const makePinPage = await pinMakeService.readMakePinPage(userId);
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

    await pinMakeService.createPin(
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
