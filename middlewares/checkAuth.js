const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ auth: false });
    }

    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Not authorized' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkAuth
};
