import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "../../Assets/card2.png"
import LoginSignUp from "../LoginSignUp"; // Import the toggle buttons

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <LoginSignUp /> {/* Include toggle buttons */}
      <div className="inputs">
        <div className="input">
          <img src={Card} alt="" />
          <input type="text" name="adharID" placeholder="Aadhar Number" required />
        </div>
      </div>
      {/* <div className="otp-text">
        <Otp length={4} onOtpSubmit={submitOtp} />
      </div> */}
      <div className="submit-container">
        <div className="submit" onClick={() => navigate("/verify")}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
