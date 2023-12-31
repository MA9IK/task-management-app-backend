const { checkAuth } = require('../middlewares/checkAuth');
const express = require('express');
const { profile, register, login, logout } = require('../controllers/index');
const router = express.Router();

module.exports = app => {
  router.get('/profile', checkAuth, profile);
  router.post('/register', register);
  router.post('/login', login);
  router.post('/logout', logout);

  app.use('/users', router);
};
