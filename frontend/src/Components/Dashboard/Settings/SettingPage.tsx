import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sett.css";
import NavBar from "../Navbar/NavBar.tsx";

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // State without explicit UserData interface
  const [userData, setUserData] = useState({
    name: "John Doe",
    number: "9876543210",
    age: 30,
    aadhar: "123456789012",
  });

  // General event type
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = (): boolean => {
    const { name, number, age, aadhar } = userData;

    if (!name || !number || !age || !aadhar) {
      toast.error("All fields are required");
      return false;
    }

    if (!/^\d{10}$/.test(number)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (!/^\d{12}$/.test(aadhar)) {
      toast.error("Aadhaar number must be 12 digits");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    try {
      // Replace with your actual API endpoint
      await axios.post("/api/user/update", userData);
      toast.success("Details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update details.");
      console.error(error);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="main11">
        <NavBar/>
        <div className="contenttt">
        <h2>User Settings ⚙️</h2>
        <div className="settings-form">
            <label>
            Name:
            <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
            />
            </label>

            <label>
            Phone Number:
            <input
                type="text"
                name="number"
                value={userData.number}
                onChange={handleChange}
                disabled={!isEditing}
            />
            </label>

            <label>
            Age:
            <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                disabled={!isEditing}
            />
            </label>

            <label>
            Aadhaar Number:
            <input
                type="text"
                name="aadhar"
                value={userData.aadhar}
                onChange={handleChange}
                disabled={!isEditing}
            />
            </label>

            <button className="edit-btn" onClick={handleEditToggle}>
            {isEditing ? "Save" : "Edit"}
            </button>
        </div>
        </div>
    </div>
  );
};

export default SettingsPage;
