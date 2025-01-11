// src/components/Blogs/BlogList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../actions/blogActions';
import BlogPost from './BlogPost';

const BlogList = () => {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (blogState.loading) {
        return <p className="text-center text-gray-700 dark:text-gray-300">Loading blogs...</p>;
    }

    if (blogState.error) {
        return <p className="text-center text-red-500">{blogState.error}</p>;
    }

    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">All Blogs</h2>
            {blogState.blogs.length === 0 ? (
                <p className="text-center text-gray-700 dark:text-gray-300">No blogs available.</p>
            ) : (
                blogState.blogs.map((blog) => (
                    <BlogPost key={blog._id} blog={blog} />
                ))
            )}
        </div>
    );
};

export default BlogList;
