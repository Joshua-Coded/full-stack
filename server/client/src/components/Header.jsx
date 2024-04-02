import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">HealthSphere+</Link>
            </div>
            <nav className="navbar">
                {!isAuthenticated ? (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/about">About Us</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/community">Community Forum</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
