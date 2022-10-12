const mongoose = require('mongoose');
const { customErrors } = require('../utils/utils');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\u002b~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\u002b.~#?&//=]*)/.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

cardSchema.statics.deleteCardByOwnerAndId = function deleteCardByOwnerAndId(
  id,
  owner,
) {
  return this.findById({ _id: id })
    .orFail(customErrors.notFound())
    .then((card) => (card.owner.toString() === owner
      ? this.findByIdAndDelete(id)
      : Promise.reject(customErrors.forbidden())));
};

module.exports = mongoose.model('card', cardSchema);
