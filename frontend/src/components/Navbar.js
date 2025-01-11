// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Navbar = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const authLinks = (
        <>
            <li>
                <Link to="/blogs/new">Create Blog</Link>
            </li>
            <li>
                <a href="#!" onClick={() => dispatch(logout())}>
                    Logout
                </a>
            </li>
            <li>
                <span>Welcome, {auth.user && auth.user.name}</span>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    );

    return (
        <nav>
            <h1>
                <Link to="/">My Blog</Link>
            </h1>
            <ul>{auth.isAuthenticated ? authLinks : guestLinks}</ul>
        </nav>
    );
};

export default Navbar;
