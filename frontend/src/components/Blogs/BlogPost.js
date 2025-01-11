// src/components/Blogs/BlogPost.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../../actions/blogActions';
import { useNavigate } from 'react-router-dom';

const BlogPost = ({ blog }) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            dispatch(deleteBlog(blog._id));
        }
    };

    const handleCardClick = () => {
        navigate(`/blogs/${blog._id}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation(); // Prevent triggering card click
        navigate(`/blogs/edit/${blog._id}`);
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer relative overflow-hidden"
            onClick={handleCardClick}
        >
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {blog.content.length > 200 ? `${blog.content.substring(0, 200)}...` : blog.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Author:</strong> {blog.author.name}
                </p>
            </div>
            {auth.isAuthenticated && auth.user._id === blog.author._id && (
                <div
                    className="absolute top-0 right-0 flex space-x-2 m-2"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering card click
                >
                    <button
                        onClick={handleEdit}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogPost;
