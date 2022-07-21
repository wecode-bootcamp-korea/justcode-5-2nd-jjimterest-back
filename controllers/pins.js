import * as pinsService from '../services/pins.js';

export const pinList = async (req, res) => {
  try {
    let keyword = req.query.keyword;
    const userId = req.userId;
    let pageNumber = req.query.pagenumber;

    const pins = await pinsService.pinList(keyword, userId, pageNumber);
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
