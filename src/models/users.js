const users = [];

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }
}

const createUser = (username, email, hashedPassword) => {
  const id = users.length + 1;
  const user = new User(id, username, email, hashedPassword);
  users.push(user);
  return { id: user.id, username: user.username, email: user.email };
};

const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

const findUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

const getAllUsers = () => {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  }));
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers
};