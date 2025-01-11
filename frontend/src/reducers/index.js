import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer,
    comments: commentReducer,
});

export default rootReducer;
