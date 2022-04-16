import express from 'express';
import {productsValidation} from '../../validations/index.js';
import {customerController} from '../../controllers/index.js';
import { auth, validate } from '../../middlewares/index.js';
import passport from 'passport';

const router = express.Router();

router
  .route('/')
  .post(customerController.createProduct)
  .get( customerController.getAllProducts);

router
  .route('/:id')
  .get(customerController.getProductById)
  .put( customerController.updateProductById)
  .delete( customerController.deleteProductById);

export default router;
