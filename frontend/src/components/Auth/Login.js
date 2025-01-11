import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {auth.error && <p className="error">{auth.error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit" disabled={auth.loading}>
                    {auth.loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
