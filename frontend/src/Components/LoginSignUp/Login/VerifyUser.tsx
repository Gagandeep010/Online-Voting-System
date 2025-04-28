// src/components/Login/VerifyUser.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Otp from "../../Otp/Otp.jsx";
import "./Login.css";

const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  interface VerifyOtpRequest {
    adharID: string | null;
    otp: string;
  }

  const submitOtp = async (enteredOtp: string): Promise<void> => {
    const aadharID: string | null = localStorage.getItem("aadharID");

    if (!enteredOtp || !aadharID) {
      alert("Missing OTP or Aadhar ID");
      return;
    }

    try {
      const requestData: VerifyOtpRequest = {
        adharID: aadharID,
        otp: enteredOtp,
      };

      const response = await axios.post<{ message: string }>("http://localhost:5000/api/login/verify-otp", requestData);

      alert(response.data.message); // Success message
      navigate("/information"); // Redirect after successful verification
    } catch (err: any) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="container">
      <span>Verification</span>
      <div className="otp-text">
        <Otp length={4} onOtpChange={setOtp} />

      </div>
      <h5 className="midvp" onClick={() => alert("Resend OTP not implemented yet")}>
        Resend via SMS?
      </h5>
      <div className="submit-container">
        <div className="submit" onClick={() => submitOtp(otp)}>
          Verify
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
