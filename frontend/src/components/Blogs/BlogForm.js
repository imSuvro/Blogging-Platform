// src/components/Blogs/BlogForm.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/blogActions';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // For editing

    const blogState = useSelector((state) => state.blogs);
    const auth = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    useEffect(() => {
        if (id) {
            const blog = blogState.blogs.find((b) => b._id === id);
            if (blog) {
                setFormData({
                    title: blog.title,
                    content: blog.content,
                });
            }
        }
    }, [id, blogState.blogs]);

    const { title, content } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateBlog(id, formData));
        } else {
            dispatch(createBlog(formData));
        }
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow">
                <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    {id ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                {blogState.error && <p className="mb-4 text-red-500">{blogState.error}</p>}
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            value={title}
                            onChange={onChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Blog Title"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={onChange}
                            rows="10"
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            placeholder="Write your blog content here..."
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={blogState.loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {blogState.loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;
