import {
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAIL,
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
    loading: false,
    error: null,
};

const blogReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_BLOGS_REQUEST:
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
                blogs: payload,
                loading: false,
            };
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: [payload, ...state.blogs],
                loading: false,
            };
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map((blog) =>
                    blog._id === payload._id ? payload : blog
                ),
                loading: false,
            };
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter((blog) => blog._id !== payload),
                loading: false,
            };
        case FETCH_BLOGS_FAIL:
        case CREATE_BLOG_FAIL:
        case UPDATE_BLOG_FAIL:
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default blogReducer;
