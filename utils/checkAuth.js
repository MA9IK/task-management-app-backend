const jwt = require('jsonwebtoken');
const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      await jwt.verify(token, process.env.SECRETKEY, {}, (err, decoded) => {
        if (err) throw err;
        res.json({auth: true, decoded});
      });
    } else {
      res.json({auth: false})
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkAuth
};