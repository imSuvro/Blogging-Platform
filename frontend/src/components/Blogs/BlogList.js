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
        return <p>Loading blogs...</p>;
    }

    if (blogState.error) {
        return <p className="error">{blogState.error}</p>;
    }

    return (
        <div className="blog-list">
            <h2>All Blogs</h2>
            {blogState.blogs.map((blog) => (
                <BlogPost key={blog._id} blog={blog} />
            ))}
        </div>
    );
};

export default BlogList;
