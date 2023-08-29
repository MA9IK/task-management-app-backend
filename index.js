const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const { register, login, logout } = require('./Controllers/UserController');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { checkAuth } = require('./utils/checkAuth');
const { registerValidator, loginValidator } = require('./validations/userValidator');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

app.post('/register', registerValidator, register);

app.post('/login', login);

app.post('/logout', checkAuth, logout)

app.listen(PORT, (req, res) => {
  console.log(`Server started on port - ${PORT}`);
});


