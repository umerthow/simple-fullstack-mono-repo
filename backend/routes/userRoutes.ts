import express from 'express';
import { fetchUserData, updateUserData } from '../controllers/user';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/user/:id', authMiddleware, fetchUserData);
router.put('/user/:id', authMiddleware, updateUserData);

export default router;
