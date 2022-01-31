const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');

const CategoryService = require('../../services/Items/categories.service');

const createCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).json(category);
});

const getAllCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.getCategory(req.body);
  res.json(category);
});

const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await CategoryService.getCategoryById(id);
  console.log(category);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, ['Category not listed']);
  }
  res.json(category);
});

const updateCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const category = await CategoryService.updateByCategoryId(id, req.body);
  console.log(category);
  res.status(httpStatus.CREATED).json(category);
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const { id } = req.body;
  await CategoryService.deleteByCategoryId(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
