import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
} from '../actions/commentActions';

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [...state.comments, payload],
                loading: false,
            };
        case CREATE_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default commentReducer;
