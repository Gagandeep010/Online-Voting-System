// import React, { useEffect, useState } from 'react';
// import NavBar from '../../Dashboard/Navbar/NavBar.tsx';
// import { getElectionContract } from '../../../web3.js';
// import './Result.css';

// interface Candidate {
//   name: string;
//   party?: string;
//   age?: number;
//   location?: string;
//   votes: number;
//   valid: boolean;
// }

// const ResultsPage = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const contract = await getElectionContract();
//         const countStr = await contract.methods.candidateCount().call();
//         const count = parseInt(countStr);

//         const fetched: Candidate[] = [];
//         const metadata = JSON.parse(localStorage.getItem("candidate_metadata") || "[]");

//         for (let i = 0; i < count; i++) {
//           const candidate = await contract.methods.candidates(i).call();
//           const votes = await contract.methods.getVoteCount(i).call();
//           const meta = metadata.find((m: any) => m.name === candidate.name);
        
//           fetched.push({
//             name: candidate.name,
//             party: meta?.party || "—",
//             age: meta?.age || "—",
//             location: "India",
//             votes: parseInt(votes),
//             valid: parseInt(votes) >= 0,
//           });
//         }
        

//         setCandidates(fetched);
//       } catch (err) {
//         console.error('Error fetching results:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="main11">
//       <NavBar />
//       <div className="contenttt">
//         <div className="title">
//           <span>Results</span>
//         </div>
//         <div className="bottom-content">
//           <div className="containar">
//             <h2 className="title">All Candidates</h2>
//             <p className="subtitle">Live Vote Count from Blockchain</p>
//             {/* <div className="controls">
//               <input type="text" placeholder="Search" className="search" />
//               <select className="sort">
//                 <option>Newest</option>
//                 <option>Oldest</option>
//               </select>
//             </div> */}
//             <div className="card">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Candidate Name</th>
//                     <th>Party Name</th>
//                     <th>Age</th>
//                     <th>Location</th>
//                     <th>Votes</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidates.map((c, index) => (
//                     <tr key={index}>
//                       <td>{c.name}</td>
//                       <td>{c.party}</td>
//                       <td>{c.age}</td>
//                       <td>{c.location}</td>
//                       <td>
//                         <span className={c.valid ? 'voteGreen' : 'voteRed'}>
//                           {c.votes}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {candidates.length === 0 && (
//                     <tr>
//                       <td colSpan={6}>Loading candidates from blockchain...</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;


import React, { useEffect, useState } from 'react';
import NavBar from '../../Dashboard/Navbar/NavBar.tsx';
import { getElectionContract } from '../../../web3.js';
import './Result.css';

interface Candidate {
  name: string;
  party?: string;
  age?: number;
  qualification?: string;
  location?: string;
  votes: number;
  valid: boolean;
}

const ResultsPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getElectionContract();
        const countStr = await contract.methods.candidateCount().call();
        const count = parseInt(countStr);

        const metadata = JSON.parse(localStorage.getItem("candidate_metadata") || "[]");

        const fetched: Candidate[] = [];

        for (let i = 0; i < count; i++) {
          const candidate = await contract.methods.candidates(i).call();
          const votes = await contract.methods.getVoteCount(i).call();

          const meta = metadata.find((m: any) => m.name === candidate.name);

          fetched.push({
            name: candidate.name,
            party: meta?.party || '—',
            age: parseInt(meta?.age) || 0,
            qualification: meta?.qualification || 'B.Tech',
            location: meta?.location || 'India',
            votes: parseInt(votes),
            valid: false // placeholder, will be calculated next
          });
        }

        const maxVotes = Math.max(...fetched.map(c => c.votes));

        const final = fetched.map(c => ({
          ...c,
          valid: c.votes === maxVotes
        }));

        setCandidates(final);
      } catch (err) {
        console.error('Error fetching results:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main11">
      <NavBar />
      <div className="contenttt">
        <div className="title">
          <span>Results</span>
        </div>
        <div className="bottom-content">
          <div className="containar">
            <h2 className="title">All Candidates</h2>
            <p className="subtitle">Live Vote Count from Blockchain</p>
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
                  {candidates.map((c, index) => (
                    <tr key={index}>
                      <td>{c.name}</td>
                      <td>{c.party}</td>
                      <td>{c.age}</td>
                      <td>{c.qualification}</td>
                      <td>{c.location}</td>
                      <td>
                        <span className={c.valid ? 'voteGreen' : 'voteRed'}>
                          {c.votes}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {candidates.length === 0 && (
                    <tr>
                      <td colSpan={6}>Loading candidates from blockchain...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
