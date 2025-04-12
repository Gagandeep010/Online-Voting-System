import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Card from "../../Assets/card2.png";
import user from "../../Assets/user.png";
import phone from "../../Assets/phone.png";
import LoginSignUp from "../LoginSignUp"; // Import the toggle buttons

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    adharID: "",
    age: "",
    user_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/User/signup", {
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
      <LoginSignUp /> {/* Include toggle buttons */}
      <div className="inputs">
        <div className="input">
          <img src={user} alt="" />
          <input
            type="text"
            name="user_name"
            placeholder="Username"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={phone} alt="" />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user} alt="" />
          <input
            type="number"
            name="age"
            placeholder="Age"
            min="18"
            max="99"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={Card} alt="" />
          <input
            type="text"
            name="adharID"
            placeholder="Aadhar Number"
            value={formData.adharID}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          Sign-Up
        </div>
      </div>
    </div>
  );
};

export default Signup;
