import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError.js';
import { roleRights } from '../../config/rolesConfig.js';
import { Admin } from '../../models/index.js'


// eslint-disable-next-line consistent-return
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, info) => {
  const admin = await Admin.findById(info.id);
  // const isAdmin = admin.role === roleRights.ADMIN;
  if (err || info || !admin) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  // if (requiredRights.length) {
  //   const userRights = roleRights.get(user.role);
  //   // eslint-disable-next-line max-len
  //   const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
  //   if (!hasRequiredRights && req.params.id !== user.id) {
  //     return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  //   }
  // }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => new Promise((resolve, reject) => {
  passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
})
  .then(() => next())
  .catch((err) => next(err));

export default auth;
