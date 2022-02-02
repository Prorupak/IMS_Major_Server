import express from 'express';
import categoriesController from '../../controllers/Items/categories.controller.js';
import validate from '../../middlewares/Auth/validate.middlewares.js';
import {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from '../../validations/Items/categories.validations.js';

const router = express.Router();

router
  .route('/')
  .post(validate(createCategory), categoriesController.createCategory)
  .get(validate(getCategory), categoriesController.getAllCategory);

router
  .route('/:id')
  .get(validate(getCategoryById), categoriesController.getCategoryById)
  .put(validate(updateCategoryById), categoriesController.updateCategoryById)
  .delete(validate(deleteCategoryById), categoriesController.deleteCategoryById);

export default router;
