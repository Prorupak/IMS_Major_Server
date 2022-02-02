import Joi from 'joi';
import {objectId, password} from './custom.validation.js';

export const createUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().lowercase(),
    password: Joi.string().custom(password),
    role: Joi.string().valid('user', 'admin'),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().lowercase(),
    history: Joi.string(),
    // password: Joi.string().custom(password),
    role: Joi.string(),
  }),
};

export const getUserById = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export const updateUserById = {
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

export const deleteUserById = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};
