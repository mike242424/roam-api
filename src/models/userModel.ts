import { Schema, model } from 'mongoose';
import UserInterface from '../types/userInterface';

// Define the schema for the User model
const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

// Create the User model
const UserModel = model<UserInterface>('User', UserSchema);

export default UserModel;
