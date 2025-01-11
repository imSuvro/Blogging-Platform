import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/commentActions';

const CommentForm = ({ blogId }) => {
    const dispatch = useDispatch();
    const commentState = useSelector((state) => state.comments);
    const auth = useSelector((state) => state.auth);

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment(blogId, { text }));
        setText('');
    };

    if (!auth.isAuthenticated) {
        return <p>Please login to comment.</p>;
    }

    return (
        <div className="comment-form">
            <h4>Add a Comment</h4>
            {commentState.error && <p className="error">{commentState.error}</p>}
            <form onSubmit={onSubmit}>
                <textarea
                    placeholder="Your comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <button type="submit" disabled={commentState.loading}>
                    {commentState.loading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
