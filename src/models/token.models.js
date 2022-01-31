const mongoose = require('mongoose');
const { tokenTypes } = require('../config/tokenTypes');
const toJSON = require('./plugins/toJSON');

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },

    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

    type: {
      type: String,
      enum: [tokenTypes.RESET_PASSWORD, tokenTypes.REFRESH, tokenTypes.VERIFY_EMAIL],
      // required: true,
    },

    expires: {
      type: Date,
      required: true,
    },

    blacklist: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

TokenSchema.plugin(toJSON);

const Token = mongoose.model('Token', TokenSchema);

export default Token;
