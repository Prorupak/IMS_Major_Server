import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';

import {userService, tokenService, authService} from '../../services'

 const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

 const login = catchAsync(async (req, res) => {
  const success = 'Successfully logged in';
  const { email, password } = req.body;
  const user = await authService.loginUserByEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  console.log(success);
  res.json({ tokens });
});

 const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

export default {
  register,
  login,
  refreshTokens,
};