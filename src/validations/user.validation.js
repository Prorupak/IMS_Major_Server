const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().lowercase(),
    password: Joi.string().custom(password),
    role: Joi.string().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().lowercase(),
    history: Joi.string(),
    // password: Joi.string().custom(password),
    role: Joi.string(),
  }),
};

const getUserById = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateUserById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().lowercase(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUserById = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
