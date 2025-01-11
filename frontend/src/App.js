// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BlogList from './components/Blogs/BlogList';
import BlogForm from './components/Blogs/BlogForm';
import PrivateRoute from './components/Routing/PrivateRoute';
import Navbar from './components/Navbar';
import SingleBlog from './components/Blogs/SingleBlog';
import ThemeProvider from './context/ThemeContext';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <ThemeProvider>
            <Router>
                <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
                    <Navbar />
                    <div className="container mx-auto px-4 py-6">
                        <Routes>
                            <Route path="/" element={<BlogList />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/blogs/:id" element={<SingleBlog />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/blogs/new" element={<BlogForm />} />
                                <Route path="/blogs/edit/:id" element={<BlogForm />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
