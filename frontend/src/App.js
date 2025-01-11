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

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/blogs/new" element={<BlogForm />} />
                        <Route path="/blogs/edit/:id" element={<BlogForm />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
