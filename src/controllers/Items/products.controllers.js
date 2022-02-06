import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import {productsService} from '../../services/index.js'

const createProduct = catchAsync(async (req, res) => {
  const product = await productsService.createProduct(req.body);
  res.status(httpStatus.CREATED).json(product);
});

const getAllProducts = catchAsync(async (req, res) => {
  const product = await productsService.getProducts(req.body);
  console.log(product);
  res.json(product);
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log('id===', req.params.id);
  const product = await productsService.getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product is not in list');
  }
  console.log('product===', product);
  res.json(product);
});

const updateProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.updateProductById(id, req.body);
  res.status(httpStatus.CREATED).json(product);
});

const deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProductById(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
