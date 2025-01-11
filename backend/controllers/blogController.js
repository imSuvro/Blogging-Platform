// backend/controllers/blogController.js
const BlogPost = require('../models/BlogPost');

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
    console.log('GET /api/blogs called');
    try {
        const blogs = await BlogPost.find().populate('author', 'name');
        console.log(`Found ${blogs.length} blogs`);
        res.json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Create a New Blog
exports.createBlog = async (req, res) => {
    console.log('POST /api/blogs called');
    const { title, content } = req.body;

    try {
        const newBlog = new BlogPost({
            title,
            content,
            author: req.user.id,
        });

        const blog = await newBlog.save();
        console.log('Blog created:', blog);
        res.status(201).json(blog);
    } catch (err) {
        console.error('Error creating blog:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update a Blog
exports.updateBlog = async (req, res) => {
    console.log(`PUT /api/blogs/${req.params.id} called`);
    const { title, content } = req.body;

    try {
        let blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        // Check user authorization
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();
        console.log('Blog updated:', blog);
        res.json(blog);
    } catch (err) {
        console.error('Error updating blog:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a Blog
exports.deleteBlog = async (req, res) => {
    console.log(`DELETE /api/blogs/${req.params.id} called`);
    try {
        let blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        // Check user authorization
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await blog.deleteOne(); // Updated line
        console.log('Blog removed:', blog);
        res.json({ msg: 'Blog removed' });
    } catch (err) {
        console.error('Error deleting blog:', err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get Single Blog by ID
exports.getBlogById = async (req, res) => {
    console.log(`GET /api/blogs/${req.params.id} called`);
    try {
        const blog = await BlogPost.findById(req.params.id)
            .populate('author', 'name')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'name' }
            });

        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        res.json(blog);
    } catch (err) {
        console.error('Error fetching blog:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid blog ID' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
};



