const jwt = require('jsonwebtoken');
const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      await jwt.verify(token, process.env.SECRETKEY, {}, (err, decoded) => {
        if (err) throw err;
        next();
      });
    } else {
      res.status(401).json({ error: 'You dont authorized' })
    }

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkAuth
};