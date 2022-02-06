import Joi from 'joi';
import {password} from './custom.validation.js';

const isAdmin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(password),
    Boolean: Joi.boolean().required(true).default(false),
  }),
};

export default {
  isAdmin,
};
