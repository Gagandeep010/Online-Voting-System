// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../Navbar/NavBar.tsx';
// import "./Register.css"

// const RegisterPage = () => {
//     const navigate = useNavigate();
//   return (
//     <div className="main11">
//       <NavBar/>
//       <div className="contenttt">
//         <div className="title">
//           <span>Registration</span>
//         </div>
//         <div className="frame28">
//             <span className="f28-text">Input your information</span>
//             <div className="frame27">
//                 <span></span>
//                 <div className="frame26">
//                     <div className="frame22">
//                         <div className="frame17">
//                             <div className="frame16">
//                                 <div className="frame8">
//                                     <div className="frame7">
//                                         <span>First name</span>
//                                         <input type="text" placeholder="John" required/>
//                                     </div>
//                                     <div className="frame7">
//                                         <span>Last name</span>
//                                         <input type="text" placeholder="Doe" required/>
//                                     </div>
//                                 </div>
//                                 <div className="frame8">
//                                     <div className="frame7">
//                                         <span>Age</span>
//                                         <input type="text" placeholder="Age" required/>
//                                     </div>
//                                     <div className="frame7">
//                                         <span>Email</span>
//                                         <input type="email" placeholder="xyz@gmail.com" required/>
//                                     </div>
//                                 </div>
//                                 <div className="frame8">
//                                     <div className="frame7">
//                                         <span>Password</span>
//                                         <input type="password" placeholder="Password" required/>
//                                     </div>
//                                     <div className="frame7">
//                                         <span>Confirm Password</span>
//                                         <input type="password" placeholder="Confirm Password" required/>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="frame25">
//                         <span></span>
//                         <div className="frame24">
//                             <div className="frame23">
//                                 <button className="register-btn" onClick={() => alert("submitted")}>Register</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterPage
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navbar/NavBar.tsx';
import "./Register.css";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [leaderImage, setLeaderImage] = useState<string | null>(null);
    const [partyImage, setPartyImage] = useState<string | null>(null);

    const handleLeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setLeaderImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handlePartyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPartyImage(URL.createObjectURL(e.target.files[0]));
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

