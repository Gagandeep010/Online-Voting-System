import React from 'react'
import NavBar from '../Navbar/NavBar.tsx'
import { useNavigate } from 'react-router-dom';
import "./Result.css"

const ResultsPage = () => {

  const candidate = {
    name: "Jane Cooper",
    party: "Microsoft",
    age: 19,
    qualification: "Btech",
    location: "United States",
    votes: 100,
    valid: true,
  };
  const navigate = useNavigate();
  return (
    <div className="main11">
      <NavBar/>
      <div className="contenttt">
        <div className="title">
          <span>Results</span>
        </div>
        <div className="bottom-content">
          <div className="containar">
            <h2 className="title">All Candidates</h2>
            <p className="subtitle">Active Members</p>
            <div className="controls">
              <input type="text" placeholder="Search" className="search" />
              <select className="sort">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Party Name</th>
                    <th>Age</th>
                    <th>Qualification</th>
                    <th>Location</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.age}</td>
                    <td>{candidate.qualification}</td>
                    <td>{candidate.location}</td>
                    <td>
                      <span className={candidate.valid ? "voteGreen" : "voteRed"}>
                        {candidate.votes}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.age}</td>
                    <td>{candidate.qualification}</td>
                    <td>{candidate.location}</td>
                    <td>
                      <span className={candidate.valid ? "voteGreen" : "voteRed"}>
                        {candidate.votes}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.age}</td>
                    <td>{candidate.qualification}</td>
                    <td>{candidate.location}</td>
                    <td>
                      <span className={candidate.valid ? "voteGreen" : "voteRed"}>
                        {candidate.votes}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.age}</td>
                    <td>{candidate.qualification}</td>
                    <td>{candidate.location}</td>
                    <td>
                      <span className={candidate.valid ? "voteGreen" : "voteRed"}>
                        {candidate.votes}
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.age}</td>
                    <td>{candidate.qualification}</td>
                    <td>{candidate.location}</td>
                    <td>
                      <span className={candidate.valid ? "voteGreen" : "voteRed"}>
                        {candidate.votes}
                      </span>
                    </td>
                  </tr>
                </tbody>
                
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage