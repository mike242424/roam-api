import express from 'express';
import { registerUser } from '../controllers/authController';
import { loginUser } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               user: { _id: '12345', username: 'exampleUser', email: 'user@example.com' }
 *               token: 'jwtToken123'
 *       '400':
 *         description: Passwords Do Not Match
 *       '500':
 *         description: Internal Server Error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               user: { _id: '12345', username: 'exampleUser', email: 'user@example.com' }
 *               token: 'jwtToken123'
 *       '400':
 *         description: Passwords Do Not Match
 *        '401':
 *         description: Invalid Username Or Password
 *       '500':
 *         description: Internal Server Error
 */
router.post('/login', loginUser);

export default router;
