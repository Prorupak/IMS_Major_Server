import express from 'express'; 
import userValidation from '../validations/user.validation.js';
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
  .post(validate(userValidation.createUser), createUser)
  .get(getAllUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUserById), getUserById)
  .patch(
    // auth('manageUsers'),
    validate(userValidation.updateUserById),

    updateUserById,
  )
  .delete(auth('manageUsers'), validate(userValidation.deleteUserById), deleteUserById);

export default router;
