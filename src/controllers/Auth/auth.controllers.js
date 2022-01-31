import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync.js';

import {userServices, tokenService, authService} from '../../services'

export const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpsStatus.CREATED).send(user);
});

export const login = catchAsync(async (req, res) => {
  const success = 'Successfully logged in';
  const { email, password } = req.body;
  const user = await authService.loginUserByEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  console.log(success);
  res.json({ tokens });
});

export const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

export default auth;