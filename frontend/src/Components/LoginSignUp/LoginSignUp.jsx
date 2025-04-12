
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../LoginSignUp/LoginSignUp.css";

function LoginSignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLogin = location.pathname === "/login";

  return (
    <div className="toggle-buttons">
      <button 
        onClick={() => navigate("/login")} 
        className={isLogin ? "active" : ""}
      >
        Login
      </button>
      <button 
        onClick={() => navigate("/register")} 
        className={!isLogin ? "active" : ""}
      >
        Sign Up
      </button>
    </div>
  );
}

export default LoginSignUp;
