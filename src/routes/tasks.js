const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const { createTask, getTasksByUserId, getTaskById, updateTask, deleteTask } = require('../models/tasks');

const router = express.Router();

const validateTask = [
  body('title').notEmpty().trim().escape(),
  body('description').optional().trim().escape(),
  body('status').optional().isIn(['pending', 'in-progress', 'completed'])
];

router.use(authenticate);

router.get('/', (req, res) => {
  const tasks = getTasksByUserId(req.userId);
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = getTaskById(req.params.id, req.userId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.post('/', validateTask, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const task = createTask(req.userId, title, description);
  res.status(201).json(task);
});

router.put('/:id', validateTask, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const task = updateTask(req.params.id, req.userId, req.body);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const deleted = deleteTask(req.params.id, req.userId);
  if (!deleted) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;