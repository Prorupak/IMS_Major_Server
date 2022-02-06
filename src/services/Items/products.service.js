import httpStatus from 'http-status';
import Products from '../../models/Items/products.models.js';
import ApiError from '../../utils/ApiError.js';

const createProduct = async (productBody) => {
  if (await Products.findByName(productBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, ['product already listed']);
  }
  return Products.create(productBody);
};

const getProducts = async (products) => {
  const product = await Products.find({ products });
  return product;
};

const getProductByName = async (name) => {
  const product = await Products.findOne({ name });
  return product;
};

const getProductById = async (id) => {
  const product = await Products.findById(id);
  return product;
};

const updateProductById = async (id, updateProduct) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Products Not Listed');
  }

  if (updateProduct.name && (await Products.findByName(updateProduct.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product already Listed');
  }
  Object.assign(product, updateProduct);

  await product.save();

  return product;
};

const deleteProductById = async (id) => {
  const product = await getProductById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Products not listed');
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
