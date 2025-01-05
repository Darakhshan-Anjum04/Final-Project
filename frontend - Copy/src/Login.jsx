import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { AuthContext } from './Context'; // Import AuthContext
import apiService from './apiService'; // Use apiService for login
import './Login.css';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { login } = useContext(AuthContext); // Use the login function from AuthContext

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.loginUser(user); // Use the login function from apiService
      alert(res.message); // Show success message
      login(res.token); // Save the token in context
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      setError(error.message || 'An error occurred during login'); // Show error message if login fails
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error if any */}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
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
            placeholder="Enter Your Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="footer">
        <span>Don't have an account? <a href="/SignUpForm">Sign Up</a></span>
      </div>
    </div>
  );
};

export default Login;