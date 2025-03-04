import React, { useState } from "react";
import "./LoginSignUp.css";

import Card from "../Assets/card2.png"
import user from "../Assets/user.png"
import phone from "../Assets/phone.png"
import otp from "../Assets/otp.png"
import Otp from "../Otp/Otp";

const LoginSignUp = () => {

    const [action,setAction] = useState("Sign-Up");
    const [formData, setFormData] = useState({
    phoneNumber: "",
    adharID: "",
    age: "",
    user_name: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/User/signup", { //CHANGE THIS URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Failed to connect to server.");
    }
  };

  const submitOtp = () => {
    console.log("Login success", otp)
  }

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={user} alt="" />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.user_name}
                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                    required
                />
            </div>}
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={phone} alt="" />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                />
            </div>}
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={user} alt="" />
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        min="18"
                        max="99"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                    />
                </div>
                }
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={Card} alt="" />
                    <input
                        type="text"
                        name="adharID"
                        placeholder="Aadhar Number"
                        value={formData.adharID}
                        onChange={(e) => setFormData({ ...formData, adharID: e.target.value })}
                        required
                    />
                </div>
            </div>
            {/* <div className="inputs1">
                {action==="Sign-Up"?<div></div>:
                  <div className="input1">
                    <Otp length = {4}/>
                  </div>
                }
            </div> */}

            <div className="otp">
               {action==="Sign-Up"?<div></div>: 
                <div className="otp-text">
                  <Otp length = {4} onOtpSubmit = {submitOtp}/>
                </div>}
            </div>
            
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign-Up")}}>
                    Sign-Up
                </div>
                <div className={action==="Sign-Up"?"submit gray":"submit"} onClick={()=>{handleSubmit()}}>
                    Login
                </div>
            </div>
            
        </div>
    );
};

export default LoginSignUp;