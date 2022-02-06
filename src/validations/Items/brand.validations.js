import Joi from 'joi';
import {objectId} from '../custom.validation.js';

const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getBrands = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getBrandsById = {
  query: Joi.object().keys({
    id: Joi.string(),
  }),
};

const updateBrandsById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
  })
    .min(1),
};

const deleteBrandsById = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  createBrand,
  getBrands,
  getBrandsById,
  updateBrandsById,
  deleteBrandsById,
};
