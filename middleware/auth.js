const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token has been passed
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Token verification
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.student;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};