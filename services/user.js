import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../models/user.js';

export const signUp = async query => {
  const { email, password } = query;
  const nickname = query.nickname ? query.nickname : query.email.split('@')[0];
  const name = query.name ? query.name : query.email.split('@')[0];

  const [user] = await userRepository.readUserByEmail(email);
};
