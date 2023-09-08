const {
  profile,
  register,
  login,
  logout
} = require('../controllers/UserController');
const {
  create,
  allTasks,
  update,
  remove
} = require('../controllers/TaskController');

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
