/* eslint-disable camelcase */
const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');

const isAdmin = (req, res, next) => {
  const { is_Admin } = req.body;
  console.log(is_Admin);
  if (is_Admin === true) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  next();
};

export default isAdmin;
