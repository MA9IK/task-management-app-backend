const { body } = require('express-validator');

const registerValidator = [
  body('username', 'Username must be at least 3 characters')
    .isString()
    .isLength({ min: 3, max: 15 })
    .trim(),
  body('email', 'Email must be valid').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({min: 6})
];

module.exports = {
  registerValidator
};