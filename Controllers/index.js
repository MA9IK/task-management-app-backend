const { create, allTasks, update, remove } = require('./TaskController');
const { profile, register, login, logout } = require('./UserController');

module.exports = {
  create,
  allTasks,
  update,
  remove,
  profile,
  register,
  login,
  logout
};
