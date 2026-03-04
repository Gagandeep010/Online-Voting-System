import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../Navbar/NavBar.tsx';
import "./Register.css";

const RegisterPage = () => {
    // const navigate = useNavigate();
    const [leaderImage, setLeaderImage] = useState(null as string | null);
    const [partyImage, setPartyImage] = useState(null as string | null);

    

const handleLeaderImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const imageUrl = URL.createObjectURL(target.files[0]);
      setLeaderImage(imageUrl);
    }
  };

  const handlePartyImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const imageUrl = URL.createObjectURL(target.files[0]);
      setPartyImage(imageUrl);
    }
  };

    const handleDeleteLeaderImage = () => {
        setLeaderImage(null);
    };

    const handleDeletePartyImage = () => {
        setPartyImage(null);
    };

    return (
        <div className="main11">
            <NavBar />
            <div className="contenttt">
                <div className="title">
                    <span>Candidate Registration</span>
                </div>
                <div className="frame28">
                    <span className="f28-text">Input your information</span>
                    <div className="frame27">
                        <div className="frame26">
                            <div className="frame22">
                                <div className="frame17">
                                    <div className="frame16">
                                        <div className="frame8">
                                            {/* Leader Image */}
                                            <div className="frame7">
                                                <span>Candidate Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLeaderImageChange}
                                                    required
                                                    disabled={!!leaderImage}
                                                />
                                                {leaderImage && (
                                                    <div className="image-preview">
                                                        <img src={leaderImage} alt="Leader Preview" />
                                                        <button className="delete-btn" onClick={handleDeleteLeaderImage}>Delete</button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Party Logo */}
                                            <div className="frame7">
                                                <span>Party Logo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePartyImageChange}
                                                    required
                                                    disabled={!!partyImage}
                                                />
                                                {partyImage && (
                                                    <div className="image-preview">
                                                        <img src={partyImage} alt="Party Logo Preview" />
                                                        <button className="delete-btn" onClick={handleDeletePartyImage}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Name fields */}
                                        <div className="frame8">
                                            <div className="frame7">
                                                <span>First name</span>
                                                <input type="text" placeholder="John" required />
                                            </div>
                                            <div className="frame7">
                                                <span>Last name</span>
                                                <input type="text" placeholder="Doe" required />
                                            </div>
                                        </div>

                                        {/* Contact fields */}
                                        <div className="frame8">
                                            <div className="frame7">
                                                <span>Phone Number</span>
                                                <input type="tel" placeholder="+12 345 6789 0" required />
                                            </div>
                                            <div className="frame7">
                                                <span>Email</span>
                                                <input type="email" placeholder="candidate@mail.com" required />
                                            </div>
                                        </div>

                                        {/* Campaign field */}
                                        <div className="frame8">
                                            <div className="frame7 full-width">
                                                <span>Campaign Slogan/Motive</span>
                                                <textarea
                                                    placeholder="Hamara Neta kessa ho at Aap jessa ho"
                                                    rows={3}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="frame25">
                                <div className="frame24">
                                    <div className="frame23">
                                        <button className="register-btn" onClick={() => alert("Candidate registered successfully!")}>
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

