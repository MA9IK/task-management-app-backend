const {
  allTasks,
  update,
  remove,
  create
} = require('../controllers/TaskController');
const { checkAuth } = require('../middlewares/checkAuth');

module.exports = app => {
  app.get('/tasks', checkAuth, allTasks);
  app.post('/tasks', checkAuth, create);
  app.patch('/tasks/:id', checkAuth, update);
  app.delete('/tasks/:id', checkAuth, remove);
};
