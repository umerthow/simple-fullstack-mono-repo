import express from 'express';
import {
  fetchUserData,
  updateUserData,
  fetchUserList,
  createUser
} from '../controllers/user';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/user/:id', authMiddleware, fetchUserData);
router.put('/user/:id', authMiddleware, updateUserData);
router.get('/users', authMiddleware, fetchUserList);
router.post('/user', authMiddleware, createUser);

export default router;
