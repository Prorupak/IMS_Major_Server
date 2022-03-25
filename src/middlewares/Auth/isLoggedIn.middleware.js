import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError.js';
import {config} from '../../config/index.js';
import {tokenService} from '../../services/index.js'
import User from '../../models/user.models.js';

console.log('jwt=====', config.jwt);

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
