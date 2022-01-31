const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { jwt } = require('../../config/config');
const { tokenService } = require('../../services').default;
const User = require('../../models/user.models');

console.log('jwt=====', jwt);

const isLoggedIn = async (req, res, next) => {
  console.log('req.headers.authorization=====', req.headers.authorization);
  console.log('hello');

  try {
    const token = req.headers.authorization;
    console.log('token=====', token);
    const decodeToken = await tokenService.verifyTokens(token, jwt.secret);
    const user = await User.findOne({ _id: decodeToken.user });

    console.log('user=====', user);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid user');
    } else {
      next();
    }
  } catch (err) {
    console.log('err=====', err);

    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
};
export default {
  isLoggedIn,
};
