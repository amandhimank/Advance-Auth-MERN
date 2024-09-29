const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } = require('../controllers/auth.controller');
const User = require('../models/user.model');
const { jwtTokenAuthentication } = require('../utils/jwt');

router.get('/check-auth', jwtTokenAuthentication, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;