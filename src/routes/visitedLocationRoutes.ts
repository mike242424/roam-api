import express from 'express';
import { addVisitedLocation } from '../controllers/visitedLocationController';
import { checkAuth } from '../middleware/checkAuthMiddleware';

const router = express.Router();

router.route('/').post(checkAuth, addVisitedLocation);

export default router;
