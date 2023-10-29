const { adminSignUp, adminSignIn, userSignIn, userSignup } = require('../Controller/userController');
const router = require('express').Router();

router.post('/admin/signup', adminSignUp);

module.exports = router;