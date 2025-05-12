// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 Internal Server Error:', err.stack || err.message);

  return res.status(500).json(
    errorResponse('Internal Server Error')
  );
};
