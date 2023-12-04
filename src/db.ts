import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL!;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log('Connected To MongoDB');
  } catch (error) {
    console.log('Could Not Connect To MongoDB', error);
  }
};

export default dbConnection;
