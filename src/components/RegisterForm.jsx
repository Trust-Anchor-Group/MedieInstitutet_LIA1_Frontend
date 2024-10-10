import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAccount } from '../api/base-api.mjs';
import { User } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  // Function to handle changes in the input fields of the form.
  const handleChange = (e) => {
    // Destructure name and value from the event target (input field)
    const { name, value } = e.target;

    // Update the formData state with the new value for the corresponding input field
    setFormData({
      ...formData, // Spread the existing formData
      [name]: value, // Update the specific field with the new value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerAccount(formData);

      setMessage('Check your email for a verification code');

      navigate('/verify'); // Redirect to the verify page
    } catch (error) {
      console.log('Registration failed', error);
      throw new Error('Registration failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form__header">
          <span className="form__icon-status">
            <User />
          </span>
          <span>Register account</span>
        </div>
        <label>
          <span>Username:</span>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Email:</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-primary">
          Register
        </button>
        {message && <p className="success-message">{message}</p>}
        <div className="form__footer">
          <div className="login-link form__msg">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="form__terms">
            <p>
              By registering, you consent to our{' '}
              <a href="#" target="_blank">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" target="_blank">
                Privacy Policy
              </a>
              , including the collection and use of your information as
              described.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
