const tasks = [];

class Task {
  constructor(id, userId, title, description, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const createTask = (userId, title, description) => {
  const id = tasks.length + 1;
  const task = new Task(id, userId, title, description);
  tasks.push(task);
  return task;
};

const getTasksByUserId = (userId) => {
  return tasks.filter(task => task.userId === parseInt(userId));
};

const getTaskById = (id, userId) => {
  return tasks.find(task => task.id === parseInt(id) && task.userId === parseInt(userId));
};

const updateTask = (id, userId, updates) => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id) && task.userId === parseInt(userId));
  if (taskIndex === -1) return null;

  const allowedUpdates = ['title', 'description', 'status'];
  allowedUpdates.forEach(field => {
    if (updates[field] !== undefined) {
      tasks[taskIndex][field] = updates[field];
    }
  });
  tasks[taskIndex].updatedAt = new Date();
  return tasks[taskIndex];
};

const deleteTask = (id, userId) => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id) && task.userId === parseInt(userId));
  if (taskIndex === -1) return false;
  
  tasks.splice(taskIndex, 1);
  return true;
};

module.exports = {
  createTask,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask
};