import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import express from 'express';

const router = express.Router();


// mount auth routes at /auth
router.use('/', authRoutes);

// mount user routes at /users
router.use('/', userRoutes);

export default router;


