import * as userService from '../services/user.js';

export const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(201).json({ message: 'SIGNUP SUCCESS' });
  } catch (errors) {
    res.status(errors.statusCode || 500).json({ message: errors.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(201).json({ message: 'LOGIN SUCCESS', token });
  } catch (errors) {
    res.status(errors.statusCode || 500).json({ message: errors.message });
  }
};
export const kakao = async (req, res) => {
  try {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
    const config = {
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      response_type: 'code',
    };
    const params = new URLSearchParams(config).toString();
    const finalURI = `${baseUrl}?${params}`;

    res.redirect(finalURI);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const kakaoLogin = async (req, res) => {
  try {
    const code = req.query.code;
    const result = await userService.kakaoLogin(code);
    res.redirect(`http://localhost:3000?token=${result}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserInfoByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const name = req.params.name;
    const result = await userService.getUserInfoByUserId(userId, name);
    const info = JSON.parse(
      JSON.stringify(
        result,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
    res.status(200).json(info);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
