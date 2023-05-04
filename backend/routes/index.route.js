import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import tradeRoutes from './trade.route.js';

import express from 'express';

const router = express.Router();


// mount auth routes 
router.use('/', authRoutes);

// mount user routes
router.use('/', userRoutes);

// mount trade routes 
router.use('/', tradeRoutes);

export default router;


