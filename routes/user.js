const express = require('express');
const { validateSignup, validateLogin } = require('../middleware/validator');
const userCtrl = require('../controllers/user')
const router = express.Router();

router.post('/signup',validateSignup ,userCtrl.signup);
router.post('/login',validateLogin ,userCtrl.login);

module.exports = router;