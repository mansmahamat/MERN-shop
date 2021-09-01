import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authUser, getUserProfile } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/login', authUser);

router.route('/profile').get(protect, getUserProfile);

export default router;
