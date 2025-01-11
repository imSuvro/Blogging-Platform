import axios from 'axios';

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOADED = 'USER_LOADED';

// Set Authorization Header
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data, // Typically contains token
        });
        dispatch(loadUser());
    } catch (err) {
        const errorMsg = err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Registration failed';
        dispatch({
            type: REGISTER_FAIL,
            payload: errorMsg,
        });
    }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data, // Typically contains token
        });
        dispatch(loadUser());
    } catch (err) {
        const errorMsg = err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Login failed';
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMsg,
        });
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    setAuthToken(null); // Clear the Authorization header
};
