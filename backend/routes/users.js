const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getMe,
  getUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:id", getUserById);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\u002b~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\u002b.~#?&//=]*)/
      ),
    }),
  }),
  updateAvatar
);

module.exports = router;
