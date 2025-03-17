import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/LoginSignUp/Login/Login";
import Signup from "./Components/LoginSignUp/SignUp/SignUp";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
