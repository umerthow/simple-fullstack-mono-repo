import { Request, Response } from 'express';
import { getUser, updateUser } from '../repository/userCollection';
import { User } from '../entities/user';

export const fetchUserData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUser(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

export const updateUserData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data: Partial<User> = req.body;
  await updateUser(userId, data);
  res.json({ success: true });
};
