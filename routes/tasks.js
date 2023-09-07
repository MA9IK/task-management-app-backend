const {
  allTasks,
  update,
  remove,
  create
} = require('../controllers/TaskController');
const { checkAuth } = require('../middlewares/checkAuth');

module.exports = app => {
  app.get('/task', checkAuth, allTasks);
  app.post('/task', checkAuth, create);
  app.patch('/task/:id', checkAuth, update);
  app.delete('/task/:id', checkAuth, remove);
};
