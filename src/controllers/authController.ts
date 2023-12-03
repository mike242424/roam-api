import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { hashPassword } from '../utils/bcryptUtils';
import { generateToken } from '../utils/jwtUtils';
import bcrypt from 'bcrypt';

// Controller function for user registration
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user using the User model
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    const token = generateToken(newUser._id);

    // Create a sanitized user object without password and confirmPassword
    const sanitizedUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    // Return the created user and the token in the response
    res.status(201).json({ user: sanitizedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

  // Handle JWT sign error
  if (Error.name === 'JsonWebTokenError') {
    res.status(500).json({ message: 'Error signing the token' });
  } else {
    res.status(500).send('Internal Server Error');
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
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // If the password is correct, generate a JWT token
    const token = generateToken(user._id);

    // Create a sanitized user object without password
    const sanitizedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    // Return the user and the token in the response
    res.status(200).json({ user: sanitizedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
