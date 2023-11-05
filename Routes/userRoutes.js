const { adminSignUp, adminSignIn, userSignIn, userSignup, verify } = require('../Controller/userController');
const router = require('express').Router();

router.post('/admin/signup', adminSignUp);
router.post('/admin/signin', adminSignIn);
router.post('/verify', verify);

module.exports = router;