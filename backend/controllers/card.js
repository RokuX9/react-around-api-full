const Card = require("../models/card");
const { responseStatus, customErrors } = require("../utils/utils");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(customErrors.notFound())
    .then((cards) => res.status(responseStatus.success.code).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.status(responseStatus.success.code).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  console.log(_id);
  Card.deleteCardByOwnerAndId(cardId, _id)
    .then((data) => res.status(responseStatus.success.code).send(data))
    .catch((err) => {
      if (err.name === "CastError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: _id },
    },
    { new: true }
  )
    .orFail(customErrors.notFound())
    .then((card) => res.status(responseStatus.success.code).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  console.log(cardId);
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id },
    },
    { new: true }
  )
    .orFail(customErrors.notFound())
    .then((card) => res.status(responseStatus.success.code).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(customErrors.badRequest(err.message));
      }
      next(err);
    });
};
