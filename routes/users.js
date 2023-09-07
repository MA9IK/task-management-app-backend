const {
  profile,
  register,
  login,
  logout
} = require('../Controllers/UserController');
const { checkAuth } = require('../middlewares/checkAuth');
let express = require('express');
let router = express.Router();

module.exports = app => {
  app.get('/profile', checkAuth, profile);
  app.post('/register', register);
  app.post('/login', login);
  app.post('/logout', logout);
};
