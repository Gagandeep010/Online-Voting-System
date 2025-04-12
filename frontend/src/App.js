import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/LoginSignUp/Login/Login";
import Signup from "./Components/LoginSignUp/SignUp/SignUp";
import Header from "./Components/Landing/Header.tsx";
import Hero from "./Components/Landing/Hero.tsx";
import InformationPage from "./Components/Dashboard/Information/InformationPage.tsx";
import VotingPage from "./Components/Dashboard/VotingArea/VotingPage.tsx";
import ResultsPage from "./Components/Dashboard/Results/ResultsPage.tsx";
import RegisterPage from "./Components/Dashboard/Register/RegisterPage.tsx";


function App() {
  return (
    // <Router>
    //   <div className="app-container">
    //     <Routes>
    //       {/* Redirect root to login */}
    //       <Route path="/" element={<Navigate to="/login" />} />
          
    //       {/* Login Page */}
    //       <Route path="/login" element={<Login />} />

    //       {/* Signup Page */}
    //       <Route path="/signup" element={<Signup />} />
    //     </Routes>
    //   </div>
    // </Router>
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={
          <div className='main'>
            <Header />
            <Hero />
          </div>
        } />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/voteregister" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
