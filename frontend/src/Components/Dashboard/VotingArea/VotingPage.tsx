import React, { useEffect, useState } from 'react';
import { web3, getElectionContract } from "../../../web3.js";
import "./vote.css";
import NavBar from '../Navbar/NavBar.tsx';
import { useNavigate } from 'react-router-dom';

const VotingPage = () => {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [votingClosed, setVotingClosed] = useState(false);
  const [voteMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const voter = localStorage.getItem("voter");
    if (voter) setVoterName(voter);

    const fetchOnChainData = async () => {
      try {
        const contract = await getElectionContract();

        const isClosed = await contract.methods.votingClosed().call();
        setVotingClosed(isClosed);

        const countStr = await contract.methods.candidateCount().call();
        const count = parseInt(countStr);
        const fetched: string[] = [];

        for (let i = 0; i < count; i++) {
          const candidate = await contract.methods.candidates(i).call();
          fetched.push(candidate.name);
        }

        setCandidates(fetched);
      } catch (error) {
        console.error("❌ Failed to fetch on-chain data", error);
      }
    };

    fetchOnChainData();
  }, []);

  const handleVoteClick = (name: string) => {
    if (!voterName.trim()) {
      alert("No voter loaded. Please switch to a voter first.");
      return navigate("/switch");
    }
    setSelectedCandidate(name);
    setShowModal(true);
  };

  const confirmVote = async () => {
    try {
      const contract = await getElectionContract();
      const accounts = await web3.eth.getAccounts();
      const aadhaarHash = web3.utils.keccak256(voterName.trim());

      const candidateIndex = candidates.findIndex(c => c === selectedCandidate);
      if (candidateIndex === -1) {
        alert("❌ Candidate not found.");
        return;
      }

      const isRegistered = await contract.methods.isRegistered(aadhaarHash).call();
      const alreadyVoted = await contract.methods.hasAlreadyVoted(aadhaarHash).call();

      if (!isRegistered) {
        await contract.methods.registerVoter(aadhaarHash).send({ from: accounts[0] });
      }

      if (alreadyVoted) {
        alert("❌ This voter has already voted.");
        setShowModal(false);
        return;
      }

      const tx = await contract.methods.castVote(aadhaarHash, candidateIndex).send({ from: accounts[0] });
      console.log("✅ Transaction successful:", tx);

      alert(`✅ ${voterName} voted for ${selectedCandidate}`);
      setHasVoted(true);
      setShowModal(false);
    } catch (error: any) {
      console.error("❌ Voting error:", error.message || error);
      alert("Voting failed. Check console for details.");
    }
  };

  const cancelVote = () => setShowModal(false);

  return (
    <div className="mainv1">
      <NavBar />
      <div className="contenvt">
        <div className="title">
          <span>Voting is <span>{votingClosed ? "Closed ❌" : "Live ✅"}</span></span>
        </div>

        {voteMessage && (
          <p style={{ color: "green", fontWeight: "bold", margin: "1rem 0" }}>
            {voteMessage}
          </p>
        )}

        {votingClosed ? (
          <div style={{ marginTop: "2rem" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ❌ Voting has been closed by the admin.
            </p>
            <button className="cancel-btn" onClick={() => navigate("/results")}>
              📊 View Results
            </button>
          </div>
        ) : (
          <>
            {hasVoted ? (
              <div style={{ marginBottom: "1rem" }}>
                <p>✅ Voter <strong>{voterName}</strong> has voted.</p>
                <button className="cancel-btn" onClick={() => navigate("/switch-voter")}>
                  🔄 Switch Voter
                </button>
              </div>
            ) : (
              <p style={{ marginBottom: "1rem" }}>
                Voter: <strong>{voterName || "No voter loaded"}</strong>
              </p>
            )}

            <div className="bottom-cont">
              {candidates.length === 0 ? (
                <p>No candidates found.</p>
              ) : (
                candidates.map((candidate, index) => (
                  <div
                    key={index}
                    className="bottom-card"
                    onClick={() => handleVoteClick(candidate)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-name">{candidate}</div>
                    <div className="card-desc">Vote for {candidate}</div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {showModal && !votingClosed && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Your Vote</h3>
            <p>Are you sure you want to vote for <strong>{selectedCandidate}</strong>?</p>
            <div className="modal-buttons">
              <button onClick={confirmVote} className="confirm-btn">Confirm</button>
              <button onClick={cancelVote} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;
