import React, { useState} from 'react';
import './SEP.css';
import NavBar from '../../Dashboard/Navbar/NavBar.tsx';
import { useNavigate } from 'react-router-dom';

const StartElectionPage = () => {
  const [electionStarted, setElectionStarted] = useState(false);
  const navigate = useNavigate();

  const handleStartElection = () => {
    setElectionStarted(true);
  };

  const handleStopElection = () => {
    setElectionStarted(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // or whatever you're storing
    navigate('/login'); // adjust this route based on your app
  };

  return (
    <div className="blocck">
      <NavBar />
      <div className="sep-container">
        <div className="sep-top">
          <h1 className="admin-title">Welcome, Admin 👋</h1>
          <div className="logout-container">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="rule-box">
          <div className="rules-box">
            <h2>📋 Rules Before Starting the Election</h2>
            <ul>
              <li>All candidates must be registered before starting.</li>
              <li>No changes can be made once the election starts.</li>
              <li>Ensure voter authentication mechanisms are active.</li>
              <li>Election data will be logged and monitored in real-time.</li>
            </ul>
          </div>
          <div className="election-card">
            <h2>{electionStarted ? "Election is Ongoing 🟢" : "Start the Election 🗳️"}</h2>
            {electionStarted ? (
              <button className="stop-btn" onClick={handleStopElection}>
                Stop Election
              </button>
            ) : (
              <button className="start-btn" onClick={handleStartElection}>
                Start Election
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartElectionPage;
