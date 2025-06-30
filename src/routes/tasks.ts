import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { createTask, getTasksByUserId, getTaskById, updateTask, deleteTask } from '../models/tasks';

interface AuthRequest extends Request {
  userId?: string;
}

const router: Router = express.Router();

const validateTask = [
  body('title').notEmpty().trim().escape(),
  body('description').optional().trim().escape(),
  body('status').optional().isIn(['pending', 'in-progress', 'completed'])
];

router.use(authenticate);

router.get('/', (req: AuthRequest, res: Response): void => {
  const tasks = getTasksByUserId(req.userId!);
  res.json(tasks);
});

router.get('/:id', (req: AuthRequest, res: Response): void => {
  const task = getTaskById(req.params.id, req.userId!);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
  res.json(task);
});

router.post('/', validateTask, (req: AuthRequest, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, description } = req.body;
  const task = createTask(req.userId!, title, description);
  res.status(201).json(task);
});

router.put('/:id', validateTask, (req: AuthRequest, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const task = updateTask(req.params.id, req.userId!, req.body);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
  res.json(task);
});

router.delete('/:id', (req: AuthRequest, res: Response): void => {
  const deleted = deleteTask(req.params.id, req.userId!);
  if (!deleted) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }
  res.json({ message: 'Task deleted successfully' });
});

export default router;