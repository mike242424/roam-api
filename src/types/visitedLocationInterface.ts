import mongoose from 'mongoose';

// Interface representing the document in MongoDB
interface VisitedLocationInterface extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user who visited
  city: string;
  state: string;
  country: string;
  dateVisited: Date;
  // photos: string[];
  // notes?: string;
}

export default VisitedLocationInterface;
