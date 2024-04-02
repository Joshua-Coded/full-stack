import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../common.css';



const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setError('');
        setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
    };

    const handleInactivityLogout = () => {
        console.log('Session timed out. Logging out...');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials and try again.');
            }


            login();
            console.log('Login successful:', data);
            setSuccess('Login successful. Redirecting to dashboard...');
            localStorage.setItem('token', data.token);

            clearTimeout(window.inactivityTimeout);
            window.inactivityTimeout = setTimeout(() => {
                handleInactivityLogout();
            }, 300000); // Set new timeout for 5 minutes

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000); // A 2-second delay to allow the success message to be read by the user
        } catch (error) {
            console.error("An error occurred during login:", error.message);
            setError(error.message); // Display any error encountered during the login process
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
