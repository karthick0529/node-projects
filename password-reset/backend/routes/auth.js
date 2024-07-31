const express = require('express');
const router = express.Router();
const { register, forgotPassword, resetPassword } = require('../controllers/auth');

router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
