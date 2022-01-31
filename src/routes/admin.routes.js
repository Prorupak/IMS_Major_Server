const express = require('express');
const validate = require('../middlewares/Auth/validate.middlewares');
const adminController = require('../controllers/Auth/admin.controllers');
const adminValidation = require('../validations/admin.validations');

const router = express.Router();

router.route('/')
  .get(validate(adminValidation.isAdmin), adminController.isAdmin);

export default router;
