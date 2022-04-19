import express from 'express';
// import {productsValidation} from '../../validations/index.js';
import {commentsControllers} from '../controllers/index.js';
// import { auth, validate } from '../../middlewares/index.js';
import passport from 'passport';

const router = express.Router();

router
  .route('/')

  .post(commentsControllers.createComments)
  .get( commentsControllers.getAllComments);

// router
//   .route('/:id')
//   .get(validate(productsValidation.getProductsById), commentsControllers.getProductById)
//   .put( commentsControllers.updateProductById)
//   .delete(validate(productsValidation.deleteProductsById), commentsControllers.deleteProductById);

// router
//   .route('/:id/brand')
//   .post(commentsControllers.createBrandByProduct)
//   .get(commentsControllers.getBrandByProduct);

export default router;
