// src/actions/commentActions.js

import axios from 'axios';

// Action Types
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAIL = 'FETCH_COMMENTS_FAIL';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAIL = 'CREATE_COMMENT_FAIL';

// Fetch Comments for a Blog
export const fetchComments = (blogId) => async (dispatch) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST });
    try {
        const res = await axios.get(`/api/comments/${blogId}`);
        dispatch({
            type: FETCH_COMMENTS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_COMMENTS_FAIL,
            payload: err.response?.data?.msg || 'An error occurred while fetching comments.',
        });
    }
};

// Create a Comment
export const createComment = (blogId, commentData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
        const res = await axios.post(`/api/comments/${blogId}`, commentData);
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: err.response?.data?.msg || 'An error occurred while creating the comment.',
        });
    }
};
