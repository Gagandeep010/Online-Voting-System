import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import "./vote.css";
import Leader from "../../Assets/person11.jpeg";
import Party from "../../Assets/party11.png";
import NavBar from '../Navbar/NavBar.tsx';

const VotingPage = () => {
  // const navigate = useNavigate();

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleVoteClick = (name: string) => {
    setSelectedCandidate(name);
    setShowModal(true);
  };

  const confirmVote = () => {
    alert(`You voted for ${selectedCandidate}`);
    setShowModal(false);
  };

  const cancelVote = () => {
    setShowModal(false);
  };

  return (
    <div className="mainv1">
      <NavBar/>
      <div className="contenvt">
        <div className="title">
          <span>Voting is <span>live now</span></span>
        </div>
        <div className="bottom-cont">
          <div className="bottom-card" onClick={() => handleVoteClick("Angela Moss")}
            style={{ cursor: "pointer" }}>
            <div className="top-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12.5" cy="3.5" r="2.5" fill="#A5A5A5"/>
                <circle cx="12.5" cy="11.5" r="2.5" fill="#A5A5A5"/>
                <circle cx="12.5" cy="19.5" r="2.5" fill="#A5A5A5"/>
              </svg>
            </div>
            <div className="card-img">
              <img src={Leader} alt="Leader" className="Leader-img" />
              <img src={Party} alt="Party" className="Party-img" />
            </div>
            <div className="card-name">Angela Moss</div>
            <div className="card-desc">
              Hamara Neta kessa hoo at <span className="desc-highlight">Aap jessa ho</span>
            </div>
            <div className="card-num">
              <div className="card-numl">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.2962 13.3365L14.2717 11.9221C14.0069 11.7374 13.6975 11.6401 13.3766 11.6401C12.8663 11.6401 12.3874 11.8903 12.0956 12.309L11.6257 12.9825C10.838 12.4543 9.95909 11.7167 9.12123 10.879C8.28352 10.0413 7.54606 9.16235 7.01796 8.37469L7.69117 7.90472C8.03434 7.66577 8.26353 7.3078 8.33632 6.89703C8.40895 6.48657 8.31739 6.07184 8.07814 5.72852L6.66395 3.70398C6.36824 3.28101 5.89109 3.02832 5.3874 3.02832C5.21284 3.02832 5.04164 3.05914 4.87867 3.11926C4.69358 3.18762 4.52116 3.27155 4.35209 3.37775L4.07255 3.57458C4.00267 3.62891 3.93766 3.68842 3.87541 3.75067C3.53437 4.09155 3.29237 4.52307 3.1558 5.03333C2.57307 7.21777 4.0167 10.521 6.74803 13.2523C9.04173 15.546 11.7973 16.9709 13.9392 16.9712H13.9393C14.3062 16.9712 14.6519 16.9285 14.9672 16.8442C15.4774 16.7078 15.9089 16.4658 16.2501 16.1246C16.3121 16.0627 16.3713 15.9977 16.4348 15.9156L16.6318 15.6345C16.728 15.4807 16.8118 15.3083 16.8811 15.1218C17.1193 14.4779 16.8788 13.7437 16.2962 13.3365Z" fill="#0D9488"/>
                  </svg>
                </div>
                <span>+12 345 6789 0</span>
              </div>
            </div>
            <div className="card-num">
              <div className="card-numl">
                <div className="icon-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10.0001 9.884L18.1307 5.44908C17.8721 4.59828 17.3476 3.85278 16.6342 3.322C15.9207 2.79123 15.0559 2.50313 14.1667 2.5H5.83338C4.94416 2.50313 4.07936 2.79123 3.36592 3.322C2.65248 3.85278 2.12797 4.59828 1.86938 5.44908L10.0001 9.884Z" fill="#0D9488"/>
                    <path d="M10.3992 11.5651C10.2768 11.6318 10.1396 11.6668 10.0001 11.6668C9.86061 11.6668 9.72337 11.6318 9.60091 11.5651L1.66675 7.2373V13.3335C1.66805 14.4381 2.10745 15.4972 2.88857 16.2783C3.66969 17.0594 4.72875 17.4988 5.83342 17.5001H14.1667C15.2714 17.4988 16.3305 17.0594 17.1116 16.2783C17.8927 15.4972 18.3321 14.4381 18.3334 13.3335V7.2373L10.3992 11.5651Z" fill="#0D9488"/>
                  </svg>
                </div>
                <span>angelamoss@mail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
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
  )
}

export default VotingPage;