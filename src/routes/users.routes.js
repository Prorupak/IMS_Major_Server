import express from 'express'; 
import {
   createUser as addVal,
   deleteUserById as deleteVal,
   getUserById as byIdVal,
   getUsers as getVal,
   updateUserById as updateVal
    } from '../validations/user.validation.js';
import {
  createUser, 
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controllers/Auth/users.controllers.js';
 import validate from '../middlewares/Auth/validate.middlewares.js';
 import auth from '../middlewares/Auth/auth.middlewares.js';

const router = express.Router();

router
  .route('/')
  .post(validate(addVal), createUser)
  .get(validate(getVal), getAllUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(byIdVal), getUserById)
  .put(validate(updateVal), updateUserById, )
  .delete(auth('manageUsers'), validate(deleteVal), deleteUserById);

export default router;
