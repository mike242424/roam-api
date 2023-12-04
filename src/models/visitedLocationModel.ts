import { Schema, model, Document } from 'mongoose';
import { VisitedLocationInterface } from '../types/visitedLocationInterface';

// Define the schema for the VisitedLocation model
const visitedLocationSchema = new Schema<VisitedLocationInterface>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    dateVisited: { type: Date, required: true },
    // photos: { type: [String], required: true },
    // notes: { type: String, required: false },
  },
  // Adds createdAt and updatedAt timestamps
  { timestamps: true },
);

// Create the VisitedLocation model
const VisitedLocationModel = model<VisitedLocationInterface>(
  'VisitedLocation',
  visitedLocationSchema,
);

export default VisitedLocationModel;
