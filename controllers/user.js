import * as userService from '../services/user.js';

export const signUp = async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(201).json({ message: 'SIGNUP SUCCESS' });
  } catch (errors) {
    res.status(errors.statusCode || 500).json({ message: errors.message });
  }
};

export const kakao = async (req, res) => {
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  const config = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: 'code',
  };

  const params = new URLSearchParams(config).toString();
  const finalURI = `${baseUrl}?${params}`;

  res.redirect(finalURI);
};

export const kakaoLogin = async (req, res) => {
  const code = req.query.code;
  const result = await userService.kakaoLogin(code);
  res.redirect(`http://localhost:3000?token=${result}`);
};
