import express from 'express';
import {validate} from '../middlewares/index.js';
import {adminValidation} from '../validations/index.js';
import {adminControllers} from '../controllers/index.js';

const router = express.Router();

router.route('/')
  .post(validate(adminValidation.createAdmin), adminControllers.createAdmin);

export default router;
