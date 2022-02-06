import httpStatus from 'http-status';
import {userService, tokenService} from '../../services/index.js';
import ApiError from '../../utils/ApiError.js';
import {tokenTypes } from  '../../config/index.js'; 

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
