import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import {customerService} from '../../services/index.js'

const createCustomer = catchAsync(async (req, res) => {
  const success = "Product created successfully";
  const customer = await customerService.createCustomer(req.body);
  res.status(httpStatus.CREATED).json({customer, success});
});

const getAllCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getAllCustomer(req.body);
  console.log(customer);
  res.send(customer);
});

const getCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log('id===', req.params.id);
  const customer = await customerService.getCustomerById(id);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'customer is not in list');
  }
  console.log('customer===', customer);
  res.json(customer);
});

const updateCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const customer = await customerService.updateCustomerById(id, req.body);
  res.status(httpStatus.CREATED).json(customer);
});

const deleteCustomerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  await customerService.deleteCustomerById(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
