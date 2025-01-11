// backend/controllers/commentController.js

const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// Create a Comment
exports.createComment = async (req, res) => {
    const { text } = req.body;
    const blogId = req.params.blogId;

    try {
        const blog = await BlogPost.findById(blogId);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        const comment = new Comment({
            blog: blogId,
            user: req.user._id,
            text,
        });

        await comment.save();

        // Add comment to blog
        blog.comments.push(comment._id);
        await blog.save();

        res.status(201).json(comment);
    } catch (err) {
        console.error('Error creating comment:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get Comments for a Blog
exports.getComments = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const comments = await Comment.find({ blog: blogId })
            .populate('user', 'name') // Populate the user's name
            .sort({ date: -1 }); // Sort comments by newest first

        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
