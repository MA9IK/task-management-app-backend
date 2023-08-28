const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const { register, login } = require('./Controllers/UserController');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.DBCONNECT)
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello backend');
});

app.post('/register', register);

app.post('/login', login);
app.listen(PORT, (req, res) => {
  console.log(`Server started on port - ${PORT}`);
});

