interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface UserPublic {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
}

const users: User[] = [];

class UserModel implements User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
    public createdAt: Date = new Date()
  ) {}
}

export const createUser = (username: string, email: string, hashedPassword: string): UserPublic => {
  const id = users.length + 1;
  const user = new UserModel(id, username, email, hashedPassword);
  users.push(user);
  return { id: user.id, username: user.username, email: user.email };
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string | number): User | undefined => {
  return users.find(user => user.id === parseInt(id.toString()));
};

export const getAllUsers = (): UserPublic[] => {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  }));
};