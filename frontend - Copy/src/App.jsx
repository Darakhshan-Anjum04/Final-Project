import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './Context'; // Correct import for AuthContext
import SignUpForm from "./SignUpForm";
import Login from "./Login";
import Home from "./Home";
import './Login.css';
import './SignUpForm.css';
import React, { useContext } from 'react';

function App() {
  const { token } = useContext(AuthContext); // Using the token from AuthContext

  return (
    <Routes>
      <Route path="/SignUpForm" element={<SignUpForm />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/SignUpForm" />} />
    </Routes>
  );
}

export default App;