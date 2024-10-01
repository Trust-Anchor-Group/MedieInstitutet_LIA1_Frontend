import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component for the Login functionality
const Login = () => {
  // State hooks for managing the form inputs and errors
  const [userName, setUserName] = useState(''); // State to handle username input
  const [password, setPassword] = useState(''); // State to handle password input
  const [error, setError] = useState(''); // State to display any errors
  const navigate = useNavigate(); // Hook for programmatic navigation in React Router

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setError(''); // Reset any previous errors

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', { // Attempt to login with axios POST request
        userName,
        password
      });

      // If login is successful
      if (response.data.success) {
        // Store authentication token and username in localStorage for persistence across page reloads
        localStorage.setItem('token', response.data.data.jwt);
        localStorage.setItem('userName', userName);
        navigate('/dashboard'); // Navigate to the dashboard after successful login
      } else {
        setError('Login failed. Please check your credentials.'); // If login fails, set an error message
      }
    } catch (error) {
      // Catch and handle any errors from the axios request or server
      setError(error.response?.data?.error || 'An error occurred during login.');
    }
  };

  // Render UI for the login form
  return (
    <div className='login-container'>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error if any */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // Update username state on input change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </div>
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link> {/* Link to registration page */}
      </p>
    </div>
  );
};

export default Login;