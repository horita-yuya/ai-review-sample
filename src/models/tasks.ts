type TaskStatus = 'pending' | 'in-progress' | 'completed';

interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskUpdates {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

const tasks: Task[] = [];

class TaskModel implements Task {
  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public description: string,
    public status: TaskStatus = 'pending',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}

export const createTask = (userId: number | string, title: string, description: string): Task => {
  const id = tasks.length + 1;
  const task = new TaskModel(id, parseInt(userId.toString()), title, description);
  tasks.push(task);
  return task;
};

export const getTasksByUserId = (userId: number | string): Task[] => {
  return tasks.filter(task => task.userId === parseInt(userId.toString()));
};

export const getTaskById = (id: number | string, userId: number | string): Task | undefined => {
  return tasks.find(task => task.id === parseInt(id.toString()) && task.userId === parseInt(userId.toString()));
};

export const updateTask = (id: number | string, userId: number | string, updates: TaskUpdates): Task | null => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id.toString()) && task.userId === parseInt(userId.toString()));
  if (taskIndex === -1) return null;

  const allowedUpdates: (keyof TaskUpdates)[] = ['title', 'description', 'status'];
  allowedUpdates.forEach(field => {
    if (updates[field] !== undefined) {
      (tasks[taskIndex] as any)[field] = updates[field];
    }
  });
  tasks[taskIndex].updatedAt = new Date();
  return tasks[taskIndex];
};

export const deleteTask = (id: number | string, userId: number | string): boolean => {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id.toString()) && task.userId === parseInt(userId.toString()));
  if (taskIndex === -1) return false;
  
  tasks.splice(taskIndex, 1);
  return true;
};