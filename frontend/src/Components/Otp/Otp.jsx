import React, { useEffect, useRef, useState } from 'react'
import './Otp.css'

const Otp = ({length=4, submitOtp = () => {}}) => {
    const [ otp, setOtp] = useState(new Array(length).fill(""));

    const inputRefs = useRef([])

    // console.log(inputRefs)

    const handleChange = (index,e) => {
        const value = e.target.value;
        if(isNaN(value)) return

        const newOtp = [...otp];

        // allow only one otp 
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger
        const combinedOtp = newOtp.join("");
        if(combinedOtp.length === length) submitOtp(combinedOtp)

        // move focus to next input
        if(value && index < length - 1 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1].focus();
        }
    }


    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1);

        // optional

        if(index > 0 && !otp[index - 1]) {
            // move focus to previous input
            inputRefs.current[otp.indexOf("")].focus();
        }
    }

    const handleKeyDown = (index,e) => {
        if(
            e.key === "Backspace" && 
            !otp[index] && 
            index > 0 && 
            inputRefs.current[index - 1] ) {
                // move focus to previous input
                inputRefs.current[index - 1].focus();
        }
    }

  return <div>
    {
        otp.map((value,index) => {
            return <input 
            key = {index} 
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
            value={value} 
            onChange = {(e) => handleChange(index,e)}
            onClick = {(e) => handleClick(index,e)}
            onKeyDown={(e) => handleKeyDown(index,e)}
            className='otpInput'
            />
                
        })
    }
  </div>
}

export default Otp