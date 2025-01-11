// backend/routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getBlogById, // Import the new controller function
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getAllBlogs);

// @route   GET /api/blogs/:id
// @desc    Get single blog by ID
// @access  Public
router.get('/:id', getBlogById);

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private
router.post('/', authMiddleware, createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private
router.put('/:id', authMiddleware, updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
