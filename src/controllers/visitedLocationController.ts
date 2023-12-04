import { Request, Response } from 'express';
import handleErrors from '../utils/errorUtils';
import VisitedLocationModel from '../models/visitedLocationModel';

// Controller function for user registration
export const addVisitedLocation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { city, state, country, dateVisited, userId } = req.body;

  // Validate required fields
  if (!city || !state || !country || !dateVisited || !userId) {
    handleErrors(res, 400, 'Missing required fields');
    return;
  }

  // Validate the format of dateVisited if needed
  if (isNaN(Date.parse(dateVisited))) {
    handleErrors(res, 400, 'Invalid date format for dateVisited');
    return;
  }

  try {
    // Create a new visited location using the VisitedLocation model
    const newLocation = await VisitedLocationModel.create({
      userId,
      city,
      state,
      country,
      dateVisited,
    });

    // Return the created location in the response
    res.status(201).json({ location: newLocation });
  } catch (error) {
    if ((error as Error).name === 'ValidationError') {
      // Handle Mongoose validation errors
      handleErrors(res, 400, 'Validation Error');
    } else {
      handleErrors(res, 500, 'Internal Server Error');
    }
  }
};
