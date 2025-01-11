// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { createComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/comments/:blogId
// @desc    Create a comment for a blog
// @access  Private
router.post('/:blogId', authMiddleware, createComment);

module.exports = router;
