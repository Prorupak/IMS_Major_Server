import express from 'express'; 
import {
  userValidation
} from '../validations/index.js';
import {usersControllers} from '../controllers/index.js';
 import {validate, auth } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), usersControllers.createUser)
    .get(validate(userValidation.getUsers), usersControllers.getAllUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUserById), usersControllers.getUserById)
    .put(validate(userValidation.updateUserById), usersControllers.updateUserById )
    .delete(auth('manageUsers'), validate(userValidation.deleteUserById), usersControllers.deleteUserById);

export default router;
