import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import adminService from '../../services/Auth/admin.service.js';

const isAdmin = catchAsync(async (req, res) => {
  // eslint-disable-next-line camelcase
  const { is_Admin } = req.body;
  const admin = await adminService.isAdmin(is_Admin);
  if (admin === false) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'not an admin');
  }
  res.json(admin);
});

export default {
  isAdmin,
};
