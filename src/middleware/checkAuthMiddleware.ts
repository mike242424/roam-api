import { Response, Request, NextFunction } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Invalid or missing token format' });
    }

    const token = tokenHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    let id: string;

    if (typeof decoded === 'string') {
      // If decoded is a string, it's the user ID
      id = decoded;
    } else {
      // If decoded is an object, it's a JwtPayload
      id = decoded.id;
    }

    const user = await UserModel.findOne({ _id: id }).select('+role');

    if (!user) {
      return res.status(401).json({ message: 'Authorization Failed' });
    }

    req.userData = user;
    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(500).json({ message: (err as Error).message });
  }
};

export default checkAuth;
