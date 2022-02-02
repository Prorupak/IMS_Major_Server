import express from 'express';
import categoriesController from '../../controllers/Items/categories.controller.js';
import validate from '../../middlewares/Auth/validate.middlewares.js';
import {categoriesValidation} from '../../validations/index.js';

const router = express.Router();

router
  .route('/')
  .post(validate(categoriesValidation.createCategory), categoriesController.createCategory)
  .get(categoriesController.getAllCategory);

router
  .route('/:id')
  .get(categoriesController.getCategoryById)
  .put(validate(categoriesController.updateCategoryById), categoriesController.updateCategoryById)
  .delete(validate(categoriesValidation.deleteCategoryById), categoriesController.deleteCategoryById);

export default router;
