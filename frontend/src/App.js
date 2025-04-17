import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Components/LoginSignUp/Login/Login";
import Signup from "./Components/LoginSignUp/SignUp/SignUp";
import Header from "./Components/Landing/Header.tsx";
import Hero from "./Components/Landing/Hero.tsx";
import InformationPage from "./Components/Dashboard/Information/InformationPage.tsx";
import VotingPage from "./Components/Dashboard/VotingArea/VotingPage.tsx";
import ResultsPage from "./Components/Dashboard/Results/ResultsPage.tsx";
import RegisterPage from "./Components/Dashboard/Register/RegisterPage.tsx";
import ECLoginPage from "./Components/ElectionCom/ECLogin/ECLoginPage.tsx";
import StartElectionPage from "./Components/ElectionCom/Start/StartElectionPage.tsx";
import SettingsPage from "./Components/Dashboard/Settings/SettingPage.tsx";
import VerifyUser from "./Components/LoginSignUp/Login/VerifyUser.tsx";

import getWeb3AndContract from "./web3";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadBlockchain = async () => {
      try {
        const { web3, accounts, election } = await getWeb3AndContract();
        setAccount(accounts[0]);

        const count = await election.methods.candidateCount().call();
        const allCandidates = [];

        for (let i = 1; i <= count; i++) {
          const candidate = await election.methods.candidates(i).call();
          allCandidates.push(candidate);
        }

        setCandidates(allCandidates);
      } catch (error) {
        console.error("Blockchain load failed:", error);
      }
    };

    loadBlockchain();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <div className="main">
              <Header />
              <Hero />
            </div>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/voting"
          element={<VotingPage candidates={candidates} account={account} />}
        />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/voteregister" element={<RegisterPage />} />
        <Route path="/Election" element={<ECLoginPage />} />
        <Route path="/start" element={<StartElectionPage />} />
        <Route path="/verify" element={<VerifyUser />} />
      </Routes>
    </Router>
  );
}

export default App;
