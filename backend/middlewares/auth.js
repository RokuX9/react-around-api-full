const jwt = require('jsonwebtoken');
const { customErrors } = require('../utils/utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(customErrors.notAuthorized());
  }
  const token = authorization.replace('Bearer ', '');
  const { JWT_SECRET } = process.env;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET || 'GamAniHohevHanime');
  } catch (err) {
    next(customErrors.notAuthorized());
  }

  req.user = payload;

  next();
};
