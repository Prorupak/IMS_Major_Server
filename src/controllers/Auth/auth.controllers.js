import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import { authService, tokenService } from '../../services/index.js';

import {
  adminService
} from '../../services/index.js';

 const register = catchAsync(async (req, res) => {
   const admin = await adminService.createAdmin(req.body);
   res.status(httpStatus.CREATED).json(admin);
});

 const login = catchAsync(async (req, res) => {
  const success = 'Successfully logged in';
   const { email, password } = req.body;
   const user = await authService.loginUserByEmailAndPassword(email, password);
   const tokens = await tokenService.generateAuthTokens(user);

  console.log(success);
   res.json({ tokens, success });
});

  const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

export default {
  register,
  login,
  refreshTokens
};