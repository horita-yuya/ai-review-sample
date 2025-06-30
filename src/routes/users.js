const express = require('express');
const { authenticate } = require('../middleware/auth');
const { findUserById, getAllUsers } = require('../models/users');

const router = express.Router();

router.use(authenticate);

router.get('/profile', (req, res) => {
  const user = findUserById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  });
});

router.get('/', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

module.exports = router;