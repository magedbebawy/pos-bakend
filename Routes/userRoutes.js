const { adminSignUp, adminSignIn, userSignIn, userSignup } = require('../Controller/userController');
const router = require('express').Router();

router.post('/admin/signup', adminSignUp);
router.post('/admin/signin', adminSignIn);

module.exports = router;