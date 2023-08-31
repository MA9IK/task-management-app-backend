const userModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, repeatPass } = req.body;

    if (repeatPass !== password) {
      return res.status(403).json({ error: 'password is not match' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username,
      email: email,
      passwordHash: hashPassword
    });

    const token = jwt.sign({
      user: user.username,
      id: user._id
    }, process.env.SECRETKEY, { expiresIn: '30d' });

    res.cookie('token', token, { maxAge: 604800000, secure: true, httpOnly: false });

    const { passwordHash, ...userWithoutPass } = user._doc;

    res.json(userWithoutPass);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    userModel.findOne({ email: email })
      .then((user) => {
        if (user) {
          const matches = bcrypt.compareSync(password, user.passwordHash);
          if (matches) {
            const token = jwt.sign({
              user: user.username,
              id: user._id
            }, process.env.SECRETKEY, { expiresIn: '30d' });
            res.userId = user._id

            res.cookie('token', token, { maxAge: remember ? 1209600000 : 604800000, secure: true, httpOnly: false }).json({ user });
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

const profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      await jwt.verify(token, process.env.SECRETKEY, {}, (err, decoded) => {
        if (err) throw err;
        res.json({ auth: true, decoded });
      });
    } else {
      res.status(401).json({ auth: false });
    }
  } catch (err) {

  }
};

const logout = async (req, res) => {
  try {
    return res.clearCookie('token').json('ok');
  } catch (err) {
    console.log(err);
    return res.status(500).json('Something went wrong');
  }
};

module.exports = {
  register,
  login,
  logout,
  profile
};