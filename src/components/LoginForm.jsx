import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint } from 'iconoir-react';
import { login } from '../api/base-api.mjs';
import AuthContext from '../state/AuthContext';

// Component for the Login functionality
export const LoginForm = () => {
  // State hooks for managing the form inputs and errors
  const [username, setUsername] = useState(''); // State to handle username input
  const [password, setPassword] = useState(''); // State to handle password input
  const [error, setError] = useState(''); // State to display any errors
  const navigate = useNavigate(); // Hook for programmatic navigation in React Router
  const { loginState } = useContext(AuthContext);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setError(''); // Reset any previous errors

    try {
      const response = await login({ username, password });
      if (response.success) {
        loginState(response.data.expires);
        navigate('/dashboard'); // Redirect to dashboard on successful login
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Render UI for the login form
  return (
    <>
      {error && <p className="error-message">{error}</p>}{' '}
      {/* Display error if any */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form__header">
          <span className="form__icon-status">
            <Fingerprint />
          </span>
          <span>Login</span>
        </div>
        <label>
          <span>Username:</span>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required
          />
        </label>

        <label htmlFor="password">
          <span>Password:</span>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </label>

        <button type="submit" className="btn-primary">
          Login
        </button>
        <div className="form__footer">
          <div className="register-link form__msg">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
