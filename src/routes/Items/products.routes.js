import express from 'express';
import {productsValidation} from '../../validations/index.js';
import {productsControllers} from '../../controllers/index.js';
import { auth, validate } from '../../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productsValidation.createProduct), productsControllers.createProduct)
  .get(validate(productsValidation.getProducts), productsControllers.getAllProducts);

router
  .route('/:id')
  .get(validate(productsValidation.getProductsById), productsControllers.getProductById)
  .put(validate(productsValidation.updateProductsById), productsControllers.updateProductById)
  .delete(validate(productsValidation.deleteProductsById), productsControllers.deleteProductById);

export default router;
