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
        <div className="blog-form">
            <h2>{id ? 'Edit Blog' : 'Create New Blog'}</h2>
            {blogState.error && <p className="error">{blogState.error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required
                />
                <textarea
                    placeholder="Content"
                    name="content"
                    value={content}
                    onChange={onChange}
                    required
                ></textarea>
                <button type="submit" disabled={blogState.loading}>
                    {blogState.loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
