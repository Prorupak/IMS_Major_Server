import express from 'express';
import {categoriesControllers} from '../../controllers/index.js';
import {validate} from '../../middlewares/index.js';
import {
  categoriesValidation
} from '../../validations/index.js';

const router = express.Router();

router
  .route('/')
  .post(validate(categoriesValidation.createCategory), categoriesControllers.createCategory)
    .get(validate(categoriesValidation.getCategory), categoriesControllers.getAllCategory);

router
  .route('/:id')
  .get(validate(categoriesValidation.getCategoryById), categoriesControllers.getCategoryById)
    .put(validate(categoriesValidation.updateCategoryById), categoriesControllers.updateCategoryById)
    .delete(validate(categoriesValidation.deleteCategoryById), categoriesControllers.deleteCategoryById);

router
  .route('/:id/products')
  .post(categoriesControllers.createCategoryByProduct)
  .get(categoriesControllers.getCategoryByProduct);


export default router;
