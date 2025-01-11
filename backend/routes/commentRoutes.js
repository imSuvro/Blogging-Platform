// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment, getComments  } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/comments/:blogId
// @desc    Create a comment for a blog
// @access  Private
router.post('/:blogId', authMiddleware, createComment);

// @route   GET /api/comments/:blogId
// @desc    Get all comments for a blog
// @access  Public
router.get('/:blogId', getComments);

module.exports = router;
