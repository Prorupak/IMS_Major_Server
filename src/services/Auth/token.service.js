const jwt = require('jsonwebtoken');
const moment = require('moment');
// const httpStatus = require('http-status');
const config = require('../../config/config');
// const userService = require('./users.service');
const Token = require('../../models/token.models');
const ApiError = require('../../utils/ApiError');
const { tokenTypes } = require('../../config/tokenTypes');

const generateToken = (id, expires, types, secret = config.jwt.secret) => {
  const payload = {
    sub: id,
    iat: moment().unix(),
    exp: expires.unix(),
    types,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, id, expires, types, blacklist = false) => {
  const tokenDoc = await Token.create({
    token,
    user: id,
    expires: expires.toDate(),
    types,
    blacklist,
  });
  return tokenDoc;
};

const verifyTokens = async (token, type) => {
  const payload = jwt.verify(token, type);
  const tokenDoc = await Token.findOne({
    token, type, user: payload.sub, blacklist: false,
  });
  if (!tokenDoc) {
    throw new ApiError('token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH,
  );
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: refreshToken,
    expires: refreshTokenExpires.toDate(),
  };
};

export default {
  generateToken,
  generateAuthTokens,
  saveToken,
  verifyTokens,
};
