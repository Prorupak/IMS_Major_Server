import httpStatus from 'http-status';
import Brands from '../../models/Items/brands.models.js';
import {Customer} from '../../models/index.js';
import ApiError from '../../utils/ApiError.js';

const createCustomer = async (customerBody) => {
  if (await Customer.findByName(customerBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, ['customer already listed']);
  }
  return Customer.create(customerBody);
};

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
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
