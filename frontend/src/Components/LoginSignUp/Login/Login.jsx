import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Otp from "../../Otp/Otp";
import Card from "../../Assets/card2.png";
import LoginSignUp from "../LoginSignUp";
import { auth } from "../../../firebase/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [aadhar, setAadhar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    // ✅ Initialize reCAPTCHA only once
    console.log("auth object:", auth);

    if (!recaptchaVerifierRef.current) {
      console.log("auth object:", auth);

      recaptchaVerifierRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible", // Use "invisible" for background check
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
        },
        auth
      );

      recaptchaVerifierRef.current.render().catch((err) => {
        console.error("reCAPTCHA render error:", err);
      });
    }
  }, []);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login/send-otp", { adharID: aadhar });
      const number = response.data.phoneNumber;
      setPhoneNumber(number);

      // 🔐 Send OTP via Firebase
      const confirmation = await signInWithPhoneNumber(auth, number, recaptchaVerifierRef.current);
      window.confirmationResult = confirmation; // Save to window for later verification
      alert(`OTP sent to ${number}`);
      setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      alert("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      // 🔐 Send token to backend for verification
      const res = await axios.post("http://localhost:5000/login/verify-otp", { idToken });
      alert(res.data.message);
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container">
      <LoginSignUp />
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={Card} alt="" />
          <input
            type="text"
            placeholder="Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
          />
        </div>
      </div>

      <div id="recaptcha-container" /> {/* reCAPTCHA container */}

      <div className="otp-text">
        {otpSent ? (
          <>
            <Otp length={6} onOtpSubmit={(val) => setOtp(val)} />
            <div className="submit" onClick={handleVerifyOtp}>Verify OTP</div>
          </>
        ) : (
          <div className="submit" onClick={handleSendOtp}>Send OTP</div>
        )}
      </div>
    </div>
  );
};

export default Login;
