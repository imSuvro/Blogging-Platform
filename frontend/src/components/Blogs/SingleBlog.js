// src/components/Blogs/SingleBlog.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBlogById, deleteBlog } from '../../actions/blogActions';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';

const SingleBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogState = useSelector((state) => state.blogs);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBlogById(id));
    }, [dispatch, id]);

    if (blogState.loading) {
        return <p className="text-center text-gray-700 dark:text-gray-300">Loading blog...</p>;
    }

    if (blogState.error) {
        return <p className="text-center text-red-500">{blogState.error}</p>;
    }

    const blog = blogState.currentBlog;

    if (!blog) {
        return <p className="text-center text-gray-700 dark:text-gray-300">Blog not found.</p>;
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            dispatch(deleteBlog(blog._id))
                .then(() => {
                    navigate('/'); // Redirect to home after deletion
                })
                .catch((err) => {
                    console.error('Failed to delete the blog:', err);
                });
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            {/* Blog Header */}
            <div className="mb-6">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Author:</strong> {blog.author.name} |{' '}
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                </p>
            </div>

            {/* Blog Content */}
            <div className="prose dark:prose-dark max-w-none">
                <p className="text-gray-800 dark:text-gray-200">{blog.content}</p>
            </div>

            {/* Action Buttons */}
            {auth.isAuthenticated && auth.user._id === blog.author._id && (
                <div className="flex space-x-4 mt-6">
                    <Link
                        to={`/blogs/edit/${blog._id}`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            )}

            {/* Comments Section */}
            <div className="mt-10">
                <CommentList blogId={blog._id} />
                {auth.isAuthenticated ? (
                    <CommentForm blogId={blog._id} />
                ) : (
                    <p className="text-gray-700 dark:text-gray-300">You must be logged in to comment.</p>
                )}
            </div>
        </div>
    );
};

export default SingleBlog;
