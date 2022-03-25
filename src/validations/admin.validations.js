import Joi from 'joi';
import {password} from './custom.validation.js';

const createAdmin = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(password),
    phone: Joi.string(),
    countries: Joi.string(),
    Boolean: Joi.boolean().required(true).default(false),
  }),
};

export default {
  createAdmin,
};
