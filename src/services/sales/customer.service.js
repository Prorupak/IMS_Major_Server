import httpStatus from 'http-status';
import { Customer, Comments} from '../../models/index.js';
import ApiError from '../../utils/ApiError.js';

const createCustomer = async (customerBody) => {
  return Customer.create(customerBody);
};

const createCommentsById = async (id, Comment) => {
  const customer = await Customer.findById(id);
  const cusComm = new Comments(Comment);
  console.log('cusComm===', cusComm.comments);
  cusComm.comments = customer;
  console.log('customer===', customer);
  await cusComm.save();


  customer.comments.push(cusComm);
  await customer.save();
  console.log('category===', cusComm);
  return customer;
};

const getCommentsById = async (id) => {
  const customer = await Customer.findById(id)
    .populate('comments')
    .exec()
  console.log('category===', customer.products);
  return customer;
}

const getAllCustomer = async (customers) => {
  const customer = await Customer.find({ customers })
  return customer;
};

const getCustomerByName = async (name) => {
  const customer = await Customer.findOne({ name });
  return customer;
};

const getCustomerById = async (id) => {
  const customer = await Customer.findById(id);
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
