import * as pinsService from '../services/pins.js';

export const pinList = async (req, res) => {
  try {
    const pins = await pinsService.pinList();
    res.status(200).json(pins);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};

export const readPinById = async (req, res) => {
  try {
    const pinId = req.params.pins_id;
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
