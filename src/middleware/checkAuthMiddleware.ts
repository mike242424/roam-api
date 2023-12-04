import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import RequestWithUser from 'types/requestWithUser';
import UserModel from '../models/userModel';
import dotenv from 'dotenv';
import handleErrors from '../utils/errorUtils';

dotenv.config();

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

// Secret key used to sign and verify JWTs
const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

    const { _id } = decoded;
    console.log('Decoded _id:', _id);

    const user = await UserModel.findOne({ _id });
    console.log('Retrieved User:', user);

    if (!user) {
      res.status(401).json({ message: 'Authorization Failed' });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      handleErrors(res, 401, 'Token Has Expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      handleErrors(res, 401, 'Invalid Token');
    } else {
      handleErrors(res, 500, 'Internal Server Error');
    }
  }
};
