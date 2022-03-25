/* eslint-disable camelcase */
import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError.js';

const isAdmin = (req, res, next) => {
  const { is_Admin } = req.body;
  console.log(is_Admin);
  if (is_Admin === true) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  next();
};

export default isAdmin;
