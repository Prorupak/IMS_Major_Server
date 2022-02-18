import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';
import { adminService } from '../../services/index.js';

const createAdmin = catchAsync(async (req, res) => {
  const admin = await adminService(req.body);
  res.status(httpStatus.CREATED).json({ admin });
});

const checkPassword = catchAsync(async (req, res) => {
  const { password } = req.body
  const pwd = await adminService.checkPassword(password);
  res.status(httpStatus.OK).json({ pwd });
})

export default {
  createAdmin,
  checkPassword
};
