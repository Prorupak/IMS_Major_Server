import express from 'express';
import {productsValidation} from '../../validations/index.js';
import {customerController} from '../../controllers/index.js';
import { auth, validate } from '../../middlewares/index.js';
import passport from 'passport';

const router = express.Router();

router
  .route('/')
  .post(customerController.createCustomer)
  .get( customerController.getAllCustomer);

router
  .route('/:id')
  .get(customerController.getCustomerById)
  .put( customerController.updateCustomerById)
  .delete( customerController.deleteCustomerById);

export default router;
