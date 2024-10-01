import React, { useState } from 'react'
import HttpService from '../services/httpService'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      UserName: '',
      EMail: '',
      Password: '',
    });

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
        } catch(error){
            console.log("Registration failed", error);
        }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            name="UserName"
            type="text"
            value={formData.UserName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="EMail"
            type="email"
            value={formData.EMail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterForm