import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    return (
        <div className="auth-form">
            <h2>Register</h2>
            {auth.error && <p className="error">{auth.error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
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
                    {auth.loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
