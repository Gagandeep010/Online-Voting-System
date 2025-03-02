import React, { useState } from "react";
import "./LoginSignUp.css";

import Card from "../Assets/card2.png"
import user from "../Assets/user.png"
import phone from "../Assets/phone.png"
import otp from "../Assets/otp.png"

const LoginSignUp = () => {

    const [action,setAction] = useState("Sign-Up");
    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={phone} alt="" />
                <input type="tel" placeholder="Phone Number"/>
            </div>}
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                <div className="input">
                    <img src={user} alt="" />
                    <input type="date" placeholder="age"/>
                </div>
                }
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={Card} alt="" />
                    <input type="text" placeholder="Aadhar Number"/>
                </div>
            </div>
            <div className="inputs1">
                {action==="Sign-Up"?<div></div>:
                <div className="input1">
                    <img src={otp} alt="" />
                    <input type="password" placeholder="Otp"/>
                </div>
                }
            </div>
            
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign-Up")}}>
                    Sign-Up
                </div>
                <div className={action==="Sign-Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>
                    Login
                </div>
            </div>
            
        </div>
    );
};

export default LoginSignUp;