import express from 'express';
import {
  authValidation
} from '../validations/index.js'
import {authControllers} from '../controllers/index.js';
import {validate} from '../middlewares/index.js';
import passport from 'passport';


const router = express.Router();

router.post('/register', validate(authValidation.register), authControllers.register);
router.post('/login', validate(authValidation.login), authControllers.login);
router.post('/refresh-token', validate(authValidation.refreshTokens), authControllers.refreshTokens);

export default router;
