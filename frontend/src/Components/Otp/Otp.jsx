import React, { useRef, useState } from 'react'
import './Otp.css'
const Otp = ({ length = 4, onOtpChange = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    onOtpChange(newOtp.join("")); // ✅ pass updated OTP to parent

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // keep rest as-is...

  return (
    <div>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={() => inputRefs.current[index]?.setSelectionRange(1, 1)}
          onKeyDown={(e) => {
            if (
              e.key === "Backspace" &&
              !otp[index] &&
              index > 0 &&
              inputRefs.current[index - 1]
            ) {
              inputRefs.current[index - 1].focus();
            }
          }}
          className="otpInput"
        />
      ))}
    </div>
  );
};
export default Otp;