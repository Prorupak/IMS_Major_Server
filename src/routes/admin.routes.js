import express from 'express';
import {validate} from '../middlewares/index.js';
import {adminValidation} from '../validations/index.js';
import {adminControllers} from '../controllers/index.js';

const router = express.Router();

router.route('/')
  .get(validate(adminValidation.isAdmin), adminControllers.isAdmin);

export default router;
