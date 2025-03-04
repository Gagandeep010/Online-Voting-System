import React, { useState } from "react";
import "./LoginSignUp.css";

import Card from "../Assets/card2.png"
import user from "../Assets/user.png"
import phone from "../Assets/phone.png"
import otp from "../Assets/otp.png"

const LoginSignUp = () => {

    const [action,setAction] = useState("Sign-Up");
    const [formData, setFormData] = useState({
    phoneNumber: "",
    adharID: "",
    dob: "",
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

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
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
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
            <div className="inputs1">
                {action==="Sign-Up"?<div></div>:
                <div className="input1">
                    <img src={otp} alt="" />
                    <input type="password" placeholder="Otp"/>
                </div>
                }
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