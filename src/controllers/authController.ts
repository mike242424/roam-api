import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import hashPassword from '../utils/bcryptUtils';
import generateJWTToken from '../utils/jwtUtils';
import handleErrors from '../utils/errorUtils';
import bcrypt from 'bcrypt';

// Controller function for user registration
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password) {
      handleErrors(res, 400, 'Missing Required Fields');
      return;
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      handleErrors(res, 400, 'Passwords Do Not Match');
      return;
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user using the User model
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateJWTToken(newUser._id);

    // Create a sanitized user object without password and confirmPassword
    const sanitizedUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    // Return the created user and the token in the response
    res.status(201).json({ user: sanitizedUser, token });
  } catch (error) {
    // Handle JWT sign error
    if (Error.name === 'JsonWebTokenError') {
      handleErrors(res, 500, 'Error Signing The Token');
    } else {
      handleErrors(res, 500, 'Internal Server Error');
    }
  }
};

// Controller function for user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find the user by their email
    const user = await UserModel.findOne({ username }).select('+password');

    // Check if the user exists
    if (!user) {
      handleErrors(res, 401, 'Invalid Username Or Password');
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      handleErrors(res, 401, 'Invalid Username Or Password');
      return;
    }

    // If the password is correct, generate a JWT token
    const token = generateJWTToken(user._id);

    // Create a sanitized user object without password
    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    // Return the user and the token in the response
    res.status(200).json({ user: sanitizedUser, token });
  } catch (error) {
    handleErrors(res, 500, 'Internal Server Error');
  }
};
