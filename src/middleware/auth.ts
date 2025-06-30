import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};