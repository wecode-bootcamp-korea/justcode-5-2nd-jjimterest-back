import * as pinMakeService from '../services/pin-make.js';

export const readMakePinPage = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('userId :', userId);

    const makePinPage = await pinMakeService.readMakePinPage(userId);
    const result = JSON.parse(
      JSON.stringify(
        makePinPage,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
