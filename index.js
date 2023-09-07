const express = require('express');
const dotenv = require('dotenv');
const connection = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { checkAuth } = require('./middlewares/checkAuth');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');

dotenv.config();
connection();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['https://test-front-tjrz.onrender.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
    httpOnly: false
  })
);
app.use(cookieParser());

app.get('/', checkAuth);

tasksRoutes(app);
usersRoutes(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
