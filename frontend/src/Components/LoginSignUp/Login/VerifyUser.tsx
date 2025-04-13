import React from 'react'
// import { useNavigate } from "react-router-dom";
import Otp from "../../Otp/Otp.jsx";
import "./Login.css"

const VerifyUser = () => {
//   const navigate = useNavigate();
    const submitOtp = () => {
      console.log("Login success");
      alert("verification complete");
    };
  
    return (
      <div className="container">
        <span>Verification</span>
        <div className="otp-text">
          <Otp length={4} onOtpSubmit={submitOtp} />
        </div>
        <h5 className="midvp" onClick={()=>alert("done")}>Resend via sms?</h5>
        <div className="submit-container">
          <div className="submit" onClick={submitOtp}>
            Verify
          </div>
        </div>
      </div>
    );
}

export default VerifyUser;