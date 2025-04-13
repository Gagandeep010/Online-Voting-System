import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="cta">
      <button
        onClick={() => console.log("User continue clicked")}
        className="cta-sbtn"
      >
        <span>continue as user</span>
      </button>
      <button
        onClick={() => navigate("/Election")}
        className="cta-adbtn"
      >
        <span>continue as admin</span>
      </button>
    </div>
  );
};

export default CallToAction;