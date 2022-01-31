const express = require('express');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/Auth/auth.controllers');
const validate = require('../middlewares/Auth/validate.middlewares');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh-token', validate(authValidation.refreshTokens), authController.refreshTokens);

export default router;
