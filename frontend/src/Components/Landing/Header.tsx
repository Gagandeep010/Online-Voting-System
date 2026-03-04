import React from "react";
import './landing.css'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="text">
        E - <span>Vote</span> 
      </div>
      <nav className="left">
        <button
          className="signup"
          onClick={() => navigate("/register")}
        >
          <span>Sign up</span>
        </button>
        <button
          className="login"
          onClick={() => 
            navigate("/login")
            // console.log("Log in clicked")
          }
        >
          Log in
        </button>
      </nav>
      {/* <button className="hidden max-sm:block" aria-label="Menu">
        <i className="ti ti-menu-2 text-2xl" />
      </button> */}
    </header>
  );
};

export default Header;
