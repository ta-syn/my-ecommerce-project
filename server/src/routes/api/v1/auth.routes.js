// server/src/routes/api/v1/auth.routes.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require('../../../controllers/user.controller');

const validate = require('../../../middlewares/validation.middleware');

// Path to the newly created validation file
const {
  registerValidation,
  loginValidation,
} = require('../../../validations/user.validation');

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

module.exports = router;
