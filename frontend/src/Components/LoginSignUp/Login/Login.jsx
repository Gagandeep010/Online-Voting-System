import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "../../Assets/card2.png";
import otp from "../../Assets/otp.png";
import Otp from "../../Otp/Otp.jsx";
import LoginSignUp from "../LoginSignUp"; // Import the toggle buttons

const Login = () => {
  const submitOtp = () => {
    console.log("Login success");
  };

  return (
    <div className="container">
      <LoginSignUp /> {/* Include toggle buttons */}
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={Card} alt="" />
          <input type="text" name="adharID" placeholder="Aadhar Number" required />
        </div>
      </div>
      <div className="otp-text">
        <Otp length={4} onOtpSubmit={submitOtp} />
      </div>
      <div className="submit-container">
        <div className="submit" onClick={submitOtp}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
