import httpStatus from 'http-status';
import Brands from '../../models/Items/brands.models.js'
import ApiError from '../../utils/ApiError.js';

const createBrand = async (brandBody) => {
  if (await Brands.findByName(brandBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product already listed');
  }
  return Brands.create(brandBody);
};

const getBrands = async (brands) => {
  Brands.find({ brands });
  console.log('=====', brands);
};

const getBrandByName = async (name) => {
  console.log('check', name);
  const brand = await Brands.findOne({ name });
  return brand;
};

const getBrandById = async (id) => {
  const brand = await Brands.findById(id);
  return brand;
};

const updateBrandById = async (updateBody, id) => {
  const brand = await getBrandById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'brand not found');
  }

  if (updateBody.name && (await Brands.findByName(updateBody.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'brand already Listed');
  }

  Object.assign(brand, updateBody);

  await brand.save();

  return brand;
};

const deleteBrandById = async (id) => {
  const brand = await getBrandById(id);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'brand not found');
  }
  await brand.remove();

  return brand;
};

export default {
  createBrand,
  getBrands,
  getBrandById,
  getBrandByName,
  updateBrandById,
  deleteBrandById,
};
