// import React from "react";
// import "./EL.css";
// import Card from "../../Assets/card2.png";
// import Otp from "../../Otp/Otp.jsx";
// import LoginSignUp from "../../LoginSignUp/LoginSignUp.jsx"; // Import the toggle buttons

// const Login = () => {
//   const submitOtp = () => {
//     console.log("Login success");
//   };

//   return (
//     <div className="container">
//       <LoginSignUp /> {/* Include toggle buttons */}
//       <div className="inputs">
//         <div className="input">
//           <img src={Card} alt="" />
//           <input type="text" name="adharID" placeholder="Aadhar Number" required />
//         </div>
//       </div>
//       <div className="otp-text">
//         <Otp length={4} onOtpSubmit={submitOtp} />
//       </div>
//       <div className="submit-container">
//         <div className="submit" onClick={submitOtp}>
//           Login
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./EL.css";
import user from "../../Assets/user.png";
import pwd from "../../Assets/pwd.png";

const ECLoginPage = () => {
  const navigate = useNavigate();
  
    return (
      <div className="container">
        <span>
            Admin Login
        </span>
        <div className="inputs">
          <div className="input">
            <img src={user} alt="" />
            <input type="text" name="user_name" placeholder="Username" required />
          </div><div className="input">
            <img src={pwd} alt="" />
            <input type="password" name="password" placeholder="Password" required />
          </div>
        </div>
        <div className="submit-container">
          <div className="submit" onClick={() => navigate("/start")}>
            Login
          </div>
        </div>
      </div>
    );
}

export default ECLoginPage