const Joi = require('joi');
const { objectId } = require('./custom.validation');

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
  query: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),
};

const updateBrandById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

const deleteBrandById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

export default {
  createBrand,
  getBrands,
  getBrandsById,
  updateBrandById,
  deleteBrandById,
};
