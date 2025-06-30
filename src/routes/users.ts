import express, { Request, Response, Router } from 'express';
import { authenticate } from '../middleware/auth';
import { findUserById, getAllUsers } from '../models/users';

interface AuthRequest extends Request {
  userId?: string;
}

const router: Router = express.Router();

router.use(authenticate);

router.get('/profile', (req: AuthRequest, res: Response): void => {
  const user = findUserById(req.userId!);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  });
});

router.get('/', (_req: AuthRequest, res: Response): void => {
  const users = getAllUsers();
  res.json(users);
});

export default router;