import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../common.css';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const timer = flashMessage && setTimeout(() => setFlashMessage(''), 5000);
        return () => clearTimeout(timer);
    }, [flashMessage]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match before proceeding
        if (user.password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unexpected error occurred during registration.');
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            setFlashMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 5000);
        } catch (error) {
            console.error("Registration error:", error.message);
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
