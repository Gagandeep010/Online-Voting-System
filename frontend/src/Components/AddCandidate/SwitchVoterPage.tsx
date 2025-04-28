import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Dashboard/Navbar/NavBar.tsx';

const SwitchVoterPage = () => {
  const [voter, setVoter] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmed = voter.trim();
    if (!trimmed) {
      alert("Please enter a valid name or Aadhaar.");
      return;
    }

    localStorage.setItem("voter", trimmed);
    navigate("/voting");
  };

  return (
    <div className="blocck">
      <NavBar />
      <div className="sep-container">
        <h1>🔁 Switch Voter</h1>
        <p>Enter the voter's name or Aadhaar number below:</p>
        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Enter voter name or Aadhaar"
            value={voter}
            onChange={(e) => setVoter(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "1rem" }}
          />
          <button className="start-btn" onClick={handleSubmit}>
            Proceed to Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchVoterPage;
