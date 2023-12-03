import mongoose, { Schema, model, Document } from 'mongoose';
import { UserAttributes } from '../types/userAttributes';

interface UserDocument extends UserAttributes, Document {}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const UserModel = model<UserDocument>('User', UserSchema);

export { UserModel, UserAttributes, UserDocument };
