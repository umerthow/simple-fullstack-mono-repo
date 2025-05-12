import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

const USERS_COLLECTION = 'USERS';

export const getUser = async (id: string): Promise<User | null> => {
  const doc = await db.collection(USERS_COLLECTION).doc(id).get();
  return doc.exists ? { id: doc.id, ...(doc.data() as Omit<User, 'id'>) } : null;
};

export const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(id).set(data, { merge: true });
};

export const getAllUsers = async (): Promise<User[]> => {
  const snapshot = await db.collection(USERS_COLLECTION).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<User, 'id'>) }));
};

export const addUser = async (user: User): Promise<string> => {
  await db.collection(USERS_COLLECTION).doc(user.id).set(user);

  return user.id
};
