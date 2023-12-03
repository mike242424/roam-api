import mongoose, { Schema, model, Document } from 'mongoose';

// Interface representing the document in MongoDB
interface VisitedLocation extends Document {
  city: string;
  state: string;
  country: string;
  userId: mongoose.Types.ObjectId; // Reference to the user who visited
}

// Define the schema for the user visit model
const visitedLocationSchema = new Schema<VisitedLocation>(
  {
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Create the VisitedLocation model
const VisitedLocationModel = model<VisitedLocation>(
  'VisitedLocation',
  visitedLocationSchema,
);

export default VisitedLocationModel;
