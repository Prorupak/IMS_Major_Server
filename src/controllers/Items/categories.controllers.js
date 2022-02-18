import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError.js';
import catchAsync from '../../utils/catchAsync.js';
import {categoriesService} from '../../services/index.js';
import Category from '../../models/Items/categories.models.js';

const createCategory = catchAsync(async (req, res) => {
  const category = await categoriesService.createCategory(req.body);
  res.status(httpStatus.CREATED).json(category);
});

const getAllCategory = catchAsync(async (req, res) => {
  const category = await categoriesService.getCategory(req.body);
  res.json(category);
});

const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await categoriesService.getCategoryById(id);
  console.log(category);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, ['Category not listed']);
  }
  res.json(category);
});

const updateCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await categoriesService.updateByCategoryId(id, req.body);
  console.log(category);
  res.status(httpStatus.CREATED).json(category);
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.body;
  await categoriesService.deleteByCategoryId(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
