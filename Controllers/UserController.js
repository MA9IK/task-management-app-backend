const userModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username,
      email: email,
      passwordHash: hashPassword
    });

    const token = jwt.sign({
      user: user.username,
      id: user._id
    }, process.env.SECRETKEY);

    res.cookie('token', token);

    const { passwordHash, ...userWithoutPass } = user._doc;

    res.json(userWithoutPass);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    userModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          const matches = bcrypt.compareSync(password, user.passwordHash);
          if (matches) {
            const token = jwt.sign({
              user: user.username,
              id: user._id
            }, process.env.SECRETKEY);

            res.cookie('token', token).json({ user });
          } else {
            return res.status(400).json({ error: 'Invalid Credentials' });
          }
        } else {
          return res.status(400).json({ error: 'Invalid Credentials' });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};