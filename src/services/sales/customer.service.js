import httpStatus from 'http-status';
import { Customer, Comments} from '../../models/index.js';
import ApiError from '../../utils/ApiError.js';

const createCustomer = async (customerBody) => {
  return Customer.create(customerBody);
};


// create comments for customer by id and push to customer comments array
const createCommentsById = async (id, commentsBody) => {
  const customer = await Customer.findById(id);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not listed');
  }
  const comment = await Comments.create(commentsBody);
  customer.comments.push(comment);
  await customer.save();
  return customer;
};



const getCommentsById = async (id) => {
  const customer = await Customer.findById(id)
    .populate('comments', 'comments')
    .exec()
  console.log('category===', customer.products);
  return customer;
}

const getAllCustomer = async (customers) => {
  const customer = await Customer.find({ customers }).populate('comments', 'comments');
  return customer;
};

const getCustomerByName = async (name) => {
  const customer = await Customer.findOne({ name });
  return customer;
};

const getCustomerById = async (id) => {
  // populate comments array to customer
  const customer = await Customer.findById(id).populate(
    'comments',
  )  
  return customer;
};


const updateCustomerById = async (id, updateCustomer) => {
  const customer = await getCustomerById(id);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer Not Listed');
  }
  Object.assign(customer, updateCustomer);

  await customer.save();

  return customer;
};

const deleteCustomerById = async (id) => {
  const customer = await getCustomerById(id);

  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not listed');
  }

  await customer.remove();

  return customer;
};

export default {
  createCustomer,
  getAllCustomer,
  getCustomerByName,
  createCommentsById,
  getCommentsById,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
