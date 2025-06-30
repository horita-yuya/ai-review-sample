Suggestion
src/models/tasks.ts
The field assignment uses 'any' type, instead use concrete types.
(tasks[taskIndex] as any)[field] = updates[field]; => tasks[taskIndex][field] = updates[field]!;

Suggestion
src/models/tasks.ts
TaskUpdates interface should use Partial utility type.
interface TaskUpdates {
  title?: string;
  description?: string;
  status?: TaskStatus;
} => type TaskUpdates = Partial<Pick<Task, 'title' | 'description' | 'status'>>;

Suggestion
src/models/users.ts
UserPublic interface should use Omit utility type.
interface UserPublic {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
} => type UserPublic = Omit<User, 'password'> & { createdAt?: Date };

Suggestion
src/utils/auth.ts
Unnecessary type assertion for jwt.SignOptions.
return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE } as jwt.SignOptions); => return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

Suggestion
src/routes/auth.ts
Request body should have typed interface instead of untyped access.
const { username, email, password } = req.body; => const { username, email, password } = req.body as RegisterRequestBody;

Suggestion
src/routes/auth.ts
Login request body should have typed interface.
const { email, password } = req.body; => const { email, password } = req.body as LoginRequestBody;

Suggestion
src/routes/tasks.ts
Create task request body should have typed interface.
const { title, description } = req.body; => const { title, description } = req.body as CreateTaskRequestBody;

Suggestion
src/routes/tasks.ts
Update task request body should have typed interface.
const task = updateTask(req.params.id, req.userId!, req.body); => const task = updateTask(req.params.id, req.userId!, req.body as UpdateTaskRequestBody);

Suggestion
src/routes/tasks.ts
AuthRequest interface is duplicated across multiple files.
interface AuthRequest extends Request {
  userId?: string;
} => import { AuthRequest } from '../types/express';

Suggestion
src/routes/users.ts
AuthRequest interface is duplicated across multiple files.
interface AuthRequest extends Request {
  userId?: string;
} => import { AuthRequest } from '../types/express';

Suggestion
src/models/tasks.ts
Task interface and TaskStatus type should be exported for use in other modules.
type TaskStatus = 'pending' | 'in-progress' | 'completed';
interface Task { => export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export interface Task {

Suggestion
src/models/users.ts
User and UserPublic interfaces should be exported for use in other modules.
interface User {
interface UserPublic { => export interface User {
export type UserPublic = Omit<User, 'password'> & { createdAt?: Date };

Suggestion
src/models/users.ts
getAllUsers should return readonly array to prevent external mutations.
export const getAllUsers = (): UserPublic[] => { => export const getAllUsers = (): ReadonlyArray<Readonly<UserPublic>> => {

Suggestion
src/routes/tasks.ts
Non-null assertion should be replaced with proper type guard.
req.userId! => if (!req.userId) { res.status(401).json({ message: 'Unauthorized' }); return; }

Suggestion
src/routes/users.ts
Non-null assertion should be replaced with proper type guard.
const user = findUserById(req.userId!); => if (!req.userId) { res.status(401).json({ message: 'Unauthorized' }); return; } const user = findUserById(req.userId);