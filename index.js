const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const { register, login, logout, profile } = require('./Controllers/UserController');
const { create, allTasks, update, remove } = require('./Controllers/TaskController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkAuth } = require('./utils/checkAuth');
const { registerValidator } = require('./validations/userValidator');

app.use(express.json());
app.use(cors({
  origin: '‘https://task-management-app-frontend.vercel.app',
  credentials: true
}));
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.DBCONNECT)
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', checkAuth);
app.get('/profile', checkAuth, profile);
app.post('/register', registerValidator, register);
app.post('/login', login);
app.post('/logout', logout);

app.get('/task', checkAuth, allTasks);
app.post('/task', checkAuth, create);
app.patch('/task/:id', checkAuth, update);
app.delete('/task/:id', checkAuth, remove);

app.listen(PORT, (req, res) => {
  console.log(`Server started on port - ${PORT}`);
});


