import { Request, Response, NextFunction } from 'express';
import { Config } from '../config/config';

const BASIC_AUTH_USERNAME = Config.basicAuth.username;
const BASIC_AUTH_PASSWORD = Config.basicAuth.password;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username !== BASIC_AUTH_USERNAME || password !== BASIC_AUTH_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  next();
};
