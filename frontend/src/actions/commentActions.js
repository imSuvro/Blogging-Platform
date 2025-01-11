import axios from 'axios';

// Action Types
export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAIL = 'CREATE_COMMENT_FAIL';

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
      payload: err.response.data.msg,
    });
  }
};
