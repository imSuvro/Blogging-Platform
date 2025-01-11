// src/reducers/blogReducer.js

import {
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAIL,
    FETCH_BLOG_BY_ID_REQUEST,
    FETCH_BLOG_BY_ID_SUCCESS,
    FETCH_BLOG_BY_ID_FAIL,
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
} from '../actions/blogActions';

const initialState = {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOGS_REQUEST:
        case FETCH_BLOG_BY_ID_REQUEST:
        case CREATE_BLOG_REQUEST:
        case UPDATE_BLOG_REQUEST:
        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload,
            };
        case FETCH_BLOG_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                currentBlog: action.payload,
            };
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.payload],
            };
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: state.blogs.map((blog) =>
                    blog._id === action.payload._id ? action.payload : blog
                ),
                currentBlog:
                    state.currentBlog && state.currentBlog._id === action.payload._id
                        ? action.payload
                        : state.currentBlog,
            };
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter((blog) => blog._id !== action.payload),
                currentBlog:
                    state.currentBlog && state.currentBlog._id === action.payload
                        ? null
                        : state.currentBlog,
            };
        case FETCH_BLOGS_FAIL:
        case FETCH_BLOG_BY_ID_FAIL:
        case CREATE_BLOG_FAIL:
        case UPDATE_BLOG_FAIL:
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default blogReducer;
