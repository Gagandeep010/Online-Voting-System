import React from "react";

const CallToAction = () => {
  return (
    <div className="cta">
      <button
        onClick={() => console.log("User continue clicked")}
        className="cta-sbtn"
      >
        <span>continue as user</span>
      </button>
      <button
        onClick={() => console.log("Admin continue clicked")}
        className="cta-adbtn"
      >
        <span>continue as admin</span>
      </button>
    </div>
  );
};

export default CallToAction;