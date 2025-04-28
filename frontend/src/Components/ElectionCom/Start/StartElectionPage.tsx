// import React, { useState, useEffect } from 'react';
// import './SEP.css';
// import NavBar from '../../Dashboard/Navbar/NavBar.tsx';
// import { useNavigate } from 'react-router-dom';
// import { web3, getElectionContract } from '../../../web3.js';

// const StartElectionPage = () => {
//   const [electionStarted, setElectionStarted] = useState(false);
//   const [addStatus, setAddStatus] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const contract = await getElectionContract();
//         const closed = await contract.methods.votingClosed().call();
//         setElectionStarted(!closed); // if closed=false, election is started
//       } catch (error) {
//         console.error("❌ Failed to fetch election status", error);
//       }
//     };

//     fetchStatus();
//   }, []);

//   const handleStartElection = async () => {
//     alert("Note: Once started, you can't undo this action!");
//     setElectionStarted(true);
//   };

//   const handleStopElection = async () => {
//     try {
//       const contract = await getElectionContract();
//       const accounts = await web3.eth.getAccounts();

//       await contract.methods.closeVoting().send({ from: accounts[0] });
//       setElectionStarted(false);
//       setAddStatus("✅ Election has been officially closed on-chain.");
//     } catch (error) {
//       console.error("❌ Error closing election:", error);
//       setAddStatus("❌ Failed to stop the election.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="blocck">
//       <NavBar />
//       <div className="sep-container">
//         <div className="sep-top">
//           <h1 className="admin-title">Welcome, Admin 👋</h1>
//           <div className="logout-container">
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </div>
//         </div>

//         <div className="rule-box">
//           <div className="rules-box">
//             <h2>📋 Rules Before Starting the Election</h2>
//             <ul>
//               <li>All candidates must be registered before starting.</li>
//               <li>No changes can be made once the election starts.</li>
//               <li>Ensure voter authentication mechanisms are active.</li>
//               <li>Election data will be logged and monitored in real-time.</li>
//             </ul>
//           </div>

//           <div className="election-card">
//             <h2>{electionStarted ? "Election is Ongoing 🟢" : "Start the Election 🗳️"}</h2>
//             {electionStarted ? (
//               <button className="stop-btn" onClick={handleStopElection}>
//                 Stop Election
//               </button>
//             ) : (
//               <button className="start-btn" onClick={handleStartElection}>
//                 Start Election
//               </button>
//             )}
//             {addStatus && <p style={{ marginTop: "0.5rem", color: "green" }}>{addStatus}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartElectionPage;


import React, { useState, useEffect } from 'react';
import './SEP.css';
import { useNavigate } from 'react-router-dom';
import { getElectionContract, web3 } from "../../../web3.js"; // ✅
import SideBarComponent from '../Sidebar/SideBarComponent.tsx';

const StartElectionPage = () => {
  const [electionStarted, setElectionStarted] = useState(false);
  const [votingClosed, setVotingClosed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const contract = await getElectionContract();
        const isClosed = await contract.methods.votingClosed().call();
        setVotingClosed(isClosed);
      } catch (error) {
        console.error("❌ Failed to fetch votingClosed:", error);
      }
    };

    fetchVotingStatus();
  }, []);

  const handleStartElection = () => {
    setElectionStarted(true);
  };

  const handleStopElection = async () => {
    try {
      const contract = await getElectionContract();
      const accounts = await web3.eth.getAccounts();
      await contract.methods.closeVoting().send({ from: accounts[0] });
      alert("🛑 Voting successfully closed!");
      setVotingClosed(true);
    } catch (error) {
      console.error("❌ Failed to close voting:", error);
      alert("❌ Failed to close election. See console.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="blocck">
      <SideBarComponent/>
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
            <h2>
              {votingClosed
                ? "🛑 Voting Closed"
                : electionStarted
                ? "Election is Ongoing 🟢"
                : "Start the Election 🗳️"}
            </h2>

            {!votingClosed && (
              <>
                {electionStarted ? (
                  <button className="stop-btn" onClick={handleStopElection}>
                    Stop Election
                  </button>
                ) : (
                  <button className="start-btn" onClick={handleStartElection}>
                    Start Election
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartElectionPage;
