import express from 'express';
import { addVisitedLocation } from '../controllers/visitedLocationController';
import checkAuthMiddleware from '../middleware/checkAuthMiddleware';

const router = express.Router();

router.route('/').post(checkAuthMiddleware, addVisitedLocation);

export default router;
