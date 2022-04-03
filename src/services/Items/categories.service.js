import httpStatus from 'http-status';
import Category from '../../models/Items/categories.models.js';
import Products from '../../models/Items/products.models.js';
import ApiError from '../../utils/ApiError.js';

const createCategory = async (products, categoryBody) => {
  const { name } = categoryBody;
  if (await Category.findByName(name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category name already Taken');
  }

  return Category.insertMany(categoryBody);
};

const getCategory = async (category) => {
  const categories = await Category.find({ category })
    .populate('products')
  return categories;
};

 const getCategoryByName = async (name) => {
  const product = await Category.findOne({ name });
  return product;
};

const getCategoryById = async (id) => {
  console.log('id===', id);
  const category = Category.findById(id).populate('products');
  // console.log('category', category);
  return category;
}

const getCategoryByProduct = async (id) => {
  const categories = await Category.findById(id)
    .populate('products')
    .populate('brand')
    .exec()
  console.log('category===', categories.products);
  return categories;
}

const createCategoryByProduct = async (id, category) => {
  const categories = await Category.findById(id);
  const catProduct = new Products(category);
  catProduct.category = categories;
  await catProduct.save();
  categories.products.push(catProduct);
  await categories.save();
  console.log('category===', catProduct);
  return categories;
}

 const updateByCategoryId = async (id, updateCategory) => {
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
  console.log('category===', category);
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
  getCategoryByProduct,
  updateByCategoryId,
  createCategoryByProduct,
  deleteByCategoryId,
};
