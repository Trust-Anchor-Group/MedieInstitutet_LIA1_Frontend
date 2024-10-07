import React, { useState } from 'react'
import HttpService from '../services/httpService'
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      UserName: '',
      EMail: '',
      Password: '',
    });

    const [message, setMessage] = useState('');

    // Function to handle changes in the input fields of the form.
    const handleChange = (e) => {
      // Destructure name and value from the event target (input field)
      const { name, value } = e.target;
      
      // Update the formData state with the new value for the corresponding input field
      setFormData({
        ...formData, // Spread the existing formData
        [name]: value // Update the specific field with the new value
      });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await HttpService.registerUser(formData);
            console.log("Registration successful", response);
            setMessage("Check your email for a verification code");
            localStorage.setItem('email,', formData.EMail);
        } catch(error){
            console.log("Registration failed", error);
        }
    }

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          
          <div className="form-group">
            <label>Username:</label>
            <input
              name="UserName"
              type="text"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              name="EMail"
              type="email"
              value={formData.EMail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='btn-primary'>Register</button>
          {message && <p className='success-message'>{message}</p>}
        </form>
        <div className='login-link'>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
      </div>
    </>
  );
}

export default RegisterForm