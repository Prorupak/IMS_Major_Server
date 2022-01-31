const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    history: Joi.array(),
    role: Joi.string(),
    about: Joi.string(),
    isEmailVerified: Joi.boolean(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(password),
    tokens: Joi.string(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  refreshTokens,
};
