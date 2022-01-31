const httpStatus = require('http-status');
const userService = require('./users.service');
const ApiError = require('../../utils/ApiError');
const { tokenService } = require('..').default;
const { tokenTypes } = require('../../config/tokenTypes');
// const User = require('../models/user.models');

const loginUserByEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || (await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  return user;
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyTokens(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  loginUserByEmailAndPassword,
  refreshAuth,
};
