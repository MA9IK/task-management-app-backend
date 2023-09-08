const { checkAuth } = require('../middlewares/checkAuth');
const { allTasks, update, remove, create } = require('../Controllers/index');

module.exports = app => {
  app.get('/tasks', checkAuth, allTasks);
  app.post('/tasks', checkAuth, create);
  app.patch('/tasks/:id', checkAuth, update);
  app.delete('/tasks/:id', checkAuth, remove);
};
