import httpStatus from 'http-status';
import { Admin } from '../../models/index.js';
import ApiError from '../../utils/ApiError.js';
import bcrypt from 'bcryptjs';


const createAdmin = async (adminBody) => {
  // eslint-disable-next-line prefer-destructuring
  if (await Admin.isEmailTaken(adminBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already taken');
  }
  return Admin.create(adminBody);
}

const getAdminById = async (id) => Admin.findById(id);


const getAdminByEmail = async (email) => Admin.findOne({ email });

const checkPassword = async (pwdPass) => {
  const pwd = await Admin.findOne({ password });
  bcrypt.compare(pwdPass, pwd).then((valid) => {
    if (!valid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }
  }).catch((err) => {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  })

  return pwd;
}


export default {
  createAdmin,
  getAdminById,
  getAdminByEmail,
  checkPassword
}
