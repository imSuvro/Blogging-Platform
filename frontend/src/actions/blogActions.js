import axios from 'axios';

// Action Types
export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAIL = 'FETCH_BLOGS_FAIL';

export const CREATE_BLOG_REQUEST = 'CREATE_BLOG_REQUEST';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAIL = 'CREATE_BLOG_FAIL';

export const UPDATE_BLOG_REQUEST = 'UPDATE_BLOG_REQUEST';
export const UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS';
export const UPDATE_BLOG_FAIL = 'UPDATE_BLOG_FAIL';

export const DELETE_BLOG_REQUEST = 'DELETE_BLOG_REQUEST';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS';
export const DELETE_BLOG_FAIL = 'DELETE_BLOG_FAIL';

export const FETCH_BLOG_BY_ID_REQUEST = 'FETCH_BLOG_BY_ID_REQUEST';
export const FETCH_BLOG_BY_ID_SUCCESS = 'FETCH_BLOG_BY_ID_SUCCESS';
export const FETCH_BLOG_BY_ID_FAIL = 'FETCH_BLOG_BY_ID_FAIL';

// Fetch All Blogs
export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  console.log('Fetching blogs...');
  try {
    const res = await axios.get('/api/blogs'); // Relative URL
    console.log('Blogs fetched successfully:', res.data);
    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error('Error fetching blogs:', err.response?.data?.msg || err.message);
    dispatch({
      type: FETCH_BLOGS_FAIL,
      payload: err.response?.data?.msg || 'An error occurred while fetching blogs.',
    });
  }
};

// Create a New Blog
export const createBlog = (blogData) => async (dispatch) => {
  dispatch({ type: CREATE_BLOG_REQUEST });
  try {
    const res = await axios.post('/api/blogs', blogData);
    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Update a Blog
export const updateBlog = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_BLOG_REQUEST });
  try {
    const res = await axios.put(`/api/blogs/${id}`, updatedData);
    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: err.response.data.msg,
    });
  }
};
export const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BLOG_REQUEST });
  try {
    await axios.delete(`/api/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: err.response?.data?.msg || 'An error occurred while deleting the blog.',
    });
  }
};

export const fetchBlogById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BLOG_BY_ID_REQUEST });
  try {
    const res = await axios.get(`/api/blogs/${id}`);
    dispatch({
      type: FETCH_BLOG_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_BLOG_BY_ID_FAIL,
      payload: err.response?.data?.msg || 'An error occurred while fetching the blog.',
    });
  }
};
