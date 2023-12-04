import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateJWTToken = (userId: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign({ _id: userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};
