import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import usersService from '../../services/Auth/users.service.js';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = req.body;
  const user = await usersService.getAllUser(users);
  console.log(user);
  res.json(user);
});

export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  res.json(user);
});

export const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUserById(id, req.body);
  res.status(httpStatus.CREATED).json(user);
});

export const deleteUserById = catchAsync(async (req, res) => {
   const { id } = req.params;
  await usersService.deleteUserById(id);
  res.status(httpStatus.NO_CONTENT).json();
});

export default users