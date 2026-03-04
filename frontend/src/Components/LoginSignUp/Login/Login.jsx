// src/components/Login/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Card from "../../Assets/card2.png";
import LoginSignUp from "../LoginSignUp";

const Login = () => {
  const [aadharID, setAadharID] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      // Send OTP to backend
      await axios.post("http://localhost:5000/api/login/send-otp", {
        adharID: aadharID,
      });

      // Store aadharID in localStorage for later use
      localStorage.setItem("aadharID", aadharID);

      alert("OTP sent to registered phone number. Check server console.");

      // Redirect to verification page
      navigate("/verify");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div className="container">
      <LoginSignUp />
      <div className="inputs">
        <div className="input">
          <img src={Card} alt="Aadhar Card Icon" />
          <input
            type="text"
            name="adharID"
            placeholder="Aadhar Number"
            required
            value={aadharID}
            onChange={(e) => setAadharID(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSendOtp}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
