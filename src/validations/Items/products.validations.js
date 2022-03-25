import Joi from 'joi';
import {objectId} from '../custom.validation.js';

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    quantity: Joi.number().required().default(1),
    unit: Joi.string().required(),
    sku: Joi.string(),
    date: Joi.date(),
    price: Joi.number().required(),
    status: Joi.string().valid('inStock', 'outStock', 'overStock', 'delivered', 'pending', 'canceled').default('inStock'),
    image: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    quantity: Joi.number().default(1),
    unit: Joi.string(),

    sku: Joi.string(),
    date: Joi.string(),
    price: Joi.number(),
    status: Joi.string(),
    image: Joi.string(),
  }),
};

const getProductsById = {
  query: Joi.object().keys(
    {
      id: Joi.string(),
    },
  ),
};

const updateProductsById = {
  params: Joi.object().keys(
    {
      id: Joi.string().custom(objectId),
    },
  ),
  body: Joi.object().keys(
    {
      name: Joi.string(),
      quantity: Joi.number(),
      date: Joi.string(),
      price: Joi.number(),
      status: Joi.string(),
      image: Joi.string(),
    },
  )
    .min(1),
};

const deleteProductsById = {
  params: Joi.object().keys(
    {
      id: Joi.string(),
    },
  ),
};

export default {
  createProduct,
  getProducts,
  getProductsById,
  updateProductsById,
  deleteProductsById,
};
