const express = require('express');

const brandValidations = require('../../validations/brand.validations');
const brandControllers = require('../../controllers/Items/brands.controllers');
const validate = require('../../middlewares/Auth/validate.middlewares');

const router = express.Router();

router
  .route('/')
  .post(validate(brandValidations.createBrand), brandControllers.createBrand)
  .get(validate(brandValidations.getBrands), brandControllers.getBrands);

router
  .route('/:id')
  .get(validate(brandValidations.getBrandsById), brandControllers.getBrandById)
  .put(validate(brandValidations.updateBrandById), brandControllers.updateBrandById)
  .delete(validate(brandValidations.deleteBrandById), brandControllers.deleteBrandById);

export default router;
