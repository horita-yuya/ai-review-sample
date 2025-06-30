import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { createUser, findUserByEmail } from '../models/users';

const router: Router = express.Router();

const validateRegister = [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

router.post('/register', validateRegister, async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = createUser(username, email, hashedPassword);
    const token = generateToken(user.id.toString());

    res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/login', validateLogin, async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user.id.toString());
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch {
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;