const httpStatus = require('http-status');
const Product = require('../../models/Items/products.models');
const ApiError = require('../../utils/ApiError');

const createProduct = async (productBody) => {
  if (await Product.findByName(productBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, ['product already listed']);
  }
  return Product.create(productBody);
};

const getProducts = async (products) => {
  const product = await Product.find({ products });
  return product;
};

const getProductByName = async (name) => {
  const product = await Product.findOne({ name });
  return product;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const updateProductById = async (id, updateProduct) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Listed');
  }

  if (updateProduct.name && (await Product.findByName(updateProduct.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product already Listed');
  }
  Object.assign(product, updateProduct);

  await product.save();

  return product;
};

const deleteProductById = async (id) => {
  const product = await getProductById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not listed');
  }

  await product.remove();

  return product;
};

export default {
  createProduct,
  getProducts,
  getProductByName,
  getProductById,
  updateProductById,
  deleteProductById,
};
