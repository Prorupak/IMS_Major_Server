import express from 'express';
import { brandValidation } from '../../validations/index.js'
import brandControllers from '../../controllers/Items/brands.controllers.js';
import validate from '../../middlewares/Auth/validate.middlewares.js';

const router = express.Router();

router
  .route('/')
  .post(validate(brandValidation.createBrand), brandControllers.createBrand)
  .get(validate(brandValidation.getBrands), brandControllers.getBrands);

router
  .route('/:id')
  .get(validate(brandValidation.getBrandsById), brandControllers.getBrandById)
  .put(validate(brandValidation.updateBrandsById), brandControllers.updateBrandById)
  .delete(validate(brandValidation.deleteBrandsById), brandControllers.deleteBrandById);

export default router;
