const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/user
// @desc    Get authenticated user
// @access  Private
router.get('/user', authMiddleware, getUser);

module.exports = router;
