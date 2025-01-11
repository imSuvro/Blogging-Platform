// src/components/Comments/CommentList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../actions/commentActions';
import Comment from './Comment';

const CommentList = ({ blogId }) => {
    const dispatch = useDispatch();
    const commentState = useSelector((state) => state.comments);

    useEffect(() => {
        dispatch(fetchComments(blogId));
    }, [dispatch, blogId]);

    if (commentState.loading) {
        return <p className="text-center text-gray-700 dark:text-gray-300">Loading comments...</p>;
    }

    if (commentState.error) {
        return <p className="text-center text-red-500">{commentState.error}</p>;
    }

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h3>
            {commentState.comments.length === 0 ? (
                <p className="text-center text-gray-700 dark:text-gray-300">No comments yet.</p>
            ) : (
                <ul className="space-y-4">
                    {commentState.comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentList;
