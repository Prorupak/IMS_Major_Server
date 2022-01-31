const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const BrandService = require('../../services/Items/brand.service');

const createBrand = catchAsync(async (req, res) => {
  const brand = await BrandService.createBrand(req.body);
  res.status(httpStatus.CREATED).json(brand);
});

const getBrands = catchAsync(async (req, res) => {
  console.log('cls brand', req.body);
  const data = req.body;
  const brand = BrandService.getBrands(data);
  res.json(brand);
});

const getBrandById = catchAsync(async (req, res) => {
  const brand = await BrandService.getBrandById(req.params.id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'brand not listed');
  }
  res.json(brand);
});

const updateBrandById = catchAsync(async (req, res) => {
  console.log('cls update', req.body);
  console.log('cls update', req.params.id);
  const brand = await BrandService.updateBrandById(req.params.id, req.body);
  res.status(httpStatus.CREATED).json(brand);
});

const deleteBrandById = catchAsync(async (req, res) => {
  await BrandService.deleteBrandById(req.params.id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
