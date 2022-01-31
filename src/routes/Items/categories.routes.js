const express = require('express');
const categoryController = require('../../controllers/Items/categories.controller');
const validate = require('../../middlewares/Auth/validate.middlewares');
const categoryValidation = require('../../validations/Items/categories.validations');

const router = express.Router();

router
  .route('/')
  .post(validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(categoryController.getAllCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(validate(categoryController.updateCategoryById), categoryController.updateCategoryById)
  .delete(validate(categoryValidation.deleteCategoryById), categoryController.deleteCategoryById);

export default router;
