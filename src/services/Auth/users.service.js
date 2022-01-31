const httpStatus = require('http-status');
const User = require('../../models/user.models');
const ApiError = require('../../utils/ApiError');

const createUser = async (userBody) => {
  // eslint-disable-next-line prefer-destructuring
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already taken');
  }
  return User.create(userBody);
};

const getUserById = async (id) => User.findById(id);

const getAllUser = async (userData) => User.find({ userData });

const getUserByEmail = async (email) => User.findOne({ email });

const updateUserById = async (id, updateBody) => {
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Taken');
  }

  Object.assign(user, updateBody);

  await user.save();

  return user;
};

const deleteUserById = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  await user.remove();

  return user;
};

export default {
  createUser,
  getAllUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
};
