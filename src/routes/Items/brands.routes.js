import express from 'express';
import { brandValidation } from '../../validations/index.js'
import {brandsControllers} from '../../controllers/index.js';
import {validate} from '../../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(validate(brandValidation.createBrand), brandsControllers.createBrand)
  .get(validate(brandValidation.getBrands), brandsControllers.getBrands);

router
  .route('/:id')
  .get(validate(brandValidation.getBrandsById), brandsControllers.getBrandById)
  .put(validate(brandValidation.updateBrandsById), brandsControllers.updateBrandById)
  .delete(validate(brandValidation.deleteBrandsById), brandsControllers.deleteBrandById);

export default router;
