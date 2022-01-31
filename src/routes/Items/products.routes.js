const express = require('express');
// const mongoose = require('mongoose');
const {
  createProduct, getAllProducts, getProductById, updateProductById, deleteProductById,
} = require('../../controllers/Items/products.controllers');
const auth = require('../../middlewares/Auth/auth.middlewares');

const validate = require('../../middlewares/Auth/validate.middlewares');
const productValidations = require('../../validations/Items/products.validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidations.createProduct), createProduct)
  .get(validate(productValidations.getProducts), getAllProducts);

router
  .route('/:id')
  .get(validate(productValidations.getProductsById), getProductById)
  .put(validate(productValidations.updateProductsById), updateProductById)
  .delete(validate(productValidations.deleteProductsById), deleteProductById);

export default router;
