import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlog } from '../../actions/blogActions';
import { Link } from 'react-router-dom';

const BlogPost = ({ blog }) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteBlog(blog._id));
    };

    return (
        <div className="blog-post">
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <p>
                <strong>Author:</strong> {blog.author.name}
            </p>
            <Link to={`/blogs/${blog._id}`}>Read More</Link>
            {auth.isAuthenticated && auth.user._id === blog.author._id && (
                <>
                    <Link to={`/blogs/edit/${blog._id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default BlogPost;
