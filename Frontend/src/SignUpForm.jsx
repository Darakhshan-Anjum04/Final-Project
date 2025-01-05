
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import apiService from './apiService'; // Use apiService for registration
import './SignUpForm.css';

const SignUpForm = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.registerUser(user); // Use the service to register the user
      alert(res.message); // Display success message
      navigate('/'); // Redirect to the home page after successful signup
    } catch (error) {
      setError(error.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error if any */}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="footer">
        <span>Already have an account? <a href="/login">Login</a></span>
      </div>
    </div>
  );
};

export default SignUpForm;
