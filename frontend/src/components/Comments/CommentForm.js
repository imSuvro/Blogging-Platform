// src/components/Comments/CommentForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/commentActions';

const CommentForm = ({ blogId }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const commentState = useSelector((state) => state.comments);

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!auth.isAuthenticated) {
            alert('You must be logged in to comment.');
            return;
        }
        dispatch(createComment(blogId, { text }));
        setText('');
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add a Comment</h3>
            {commentState.error && <p className="mb-4 text-red-500">{commentState.error}</p>}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <textarea
                        placeholder="Your comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        rows="4"
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={commentState.loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {commentState.loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
