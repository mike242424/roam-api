import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.SECRET_KEY!, {
    expiresIn: '1h', // Token expiration time
  });
};
