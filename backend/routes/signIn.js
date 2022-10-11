const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/user');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

module.exports = router;
