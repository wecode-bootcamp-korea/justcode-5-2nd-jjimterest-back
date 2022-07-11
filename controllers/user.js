import * as userService from '../services/user.js';

export const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(201).json({ message: 'SIGNUP SUCCESS' });
  } catch (errors) {
    res.status(errors.statusCode || 500).json({ message: errors.message });
  }
};
