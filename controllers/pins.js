import * as pinsService from '../services/pins.js';

export const pinList = async (req, res) => {
  try {
    const [pins] = await pinsService.pinList();
    res.status(200).json(pins);
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};
