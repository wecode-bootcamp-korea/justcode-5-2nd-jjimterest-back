import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../models/user.js';

export const signUp = async body => {
  const { email, password } = body;
  const nickname = body.nickname ? body.nickname : body.email.split('@')[0];
  const name = body.name ? body.name : body.email.split('@')[0];
  const user = await userRepository.readUserByEmail(email);
  if (user) {
    const error = new Error('EXISTING_USER');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const createUser = await userRepository.createUser(
    email,
    hash,
    nickname,
    name
  );

  return createUser;
};

export const login = async body => {
  const { email, password } = body;
  const user = await userRepository.readUserByEmail(email);
  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  return token;
};
