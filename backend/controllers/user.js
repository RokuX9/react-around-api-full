const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { responseStatus, customErrors } = require('../utils/utils');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(customErrors.notFound())
    .then((users) => res.status(responseStatus.success.code).send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail(customErrors.notFound)
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById({ _id: id })
    .orFail(customErrors.notFound())
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(customErrors.notFound())
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(customErrors.notFound())
    .then((user) => res.status(responseStatus.success.code).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET || 'GamAniHohevHanime',
      );
      res.send({ token });
    })
    .catch(next);
};
