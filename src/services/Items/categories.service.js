import httpStatus from 'http-status';
import Category from '../../models/Items/categories.models.js';
import ApiError from '../../utils/ApiError.js';

 const createCategory = async (categoryBody) => {
  console.log('categoryBody===', categoryBody.name);
  const { name } = categoryBody;
  if (await Category.findByName(name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category name already Taken');
  }
  return Category.create(categoryBody);
};

 const getCategory = async (category) => {
  const categories = await Category.find({ category });
  return categories;
};

 const getCategoryByName = async (name) => {
  const product = await Category.findOne({ name });
  return product;
};

 const getCategoryById = async (id) => Category.findById(id);

 const updateByCategoryId = async (updateCategory, id) => {
  console.log(id);
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not listed');
  }

  if (updateCategory.name && (await Category.findByName(updateCategory.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Categories name Already taken');
  }

  Object.assign(category, updateCategory);

  await category.save();

  return category;
};

 const deleteByCategoryId = async (id) => {
  const category = await getCategoryById(id);
  if (!category) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'category not found');
  }

  await category.remove();

  return category;
};

export default {
  createCategory,
  getCategory,
  getCategoryByName,
  getCategoryById,
  updateByCategoryId,
  deleteByCategoryId,
};
