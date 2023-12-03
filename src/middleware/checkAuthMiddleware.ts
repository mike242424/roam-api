// import jwt from 'jsonwebtoken';
// import { UserModel } from '../models/userModel';
// import { NextFunction } from 'express';

// require('dotenv').config();

// const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const tokenHeader = req.headers.authorization;

//     if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
//       return res
//         .status(401)
//         .json({ message: 'Invalid or missing token format' });
//     }

//     const token = tokenHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     const { id } = decoded;

//     const user = await UserModel.findOne({ _id: id }).select('+role');

//     if (!user) {
//       return res.status(401).json({ message: 'Authorization Failed' });
//     }

//     req.userData = user;
//     return next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token has expired' });
//     }

//     if (err.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = checkAuth;
