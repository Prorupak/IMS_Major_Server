import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import usersService from '../../services/Auth/users.service.js';

  const createUser = catchAsync(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

  const getAllUsers = catchAsync(async (req, res) => {
  const users = req.body;
  const user = await usersService.getAllUser(users);
  console.log(user);
  res.json(user);
});

  const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  res.json(user);
});

  const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUserById(id, req.body);
  res.status(httpStatus.CREATED).json(user);
});

  const deleteUserById = catchAsync(async (req, res) => {
   const { id } = req.params;
  await usersService.deleteUserById(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};