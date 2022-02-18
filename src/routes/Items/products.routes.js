import express from 'express';
import {productsValidation} from '../../validations/index.js';
import {productsControllers} from '../../controllers/index.js';
import { auth, validate } from '../../middlewares/index.js';
import passport from 'passport';

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} /api/products Create product
   * @middlewares {auth, validate}
   * @callback {productsControllers.createProduct} 
   */
  .post(auth(), validate(productsValidation.createProduct), productsControllers.createProduct)
  /**
   * @api {get} /api/products Get all products
   * @middlewares {auth, validate}
   */
  .get(validate(productsValidation.getProducts), productsControllers.getAllProducts);

router
  .route('/:id')
  .get(validate(productsValidation.getProductsById), productsControllers.getProductById)
  .put(validate(productsValidation.updateProductsById), productsControllers.updateProductById)
  .delete(validate(productsValidation.deleteProductsById), productsControllers.deleteProductById);

export default router;
