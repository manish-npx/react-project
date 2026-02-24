import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function OtpInput() {
  const OTP_LENGTH = 4;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const inputRefs = useRef([]);

  //ensure that inputrefs has refernces up to otp length
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
  }, []);

  const handleOtpChange = (getCurrentInputIndex, getCurrentInputValue) => {
    if (getCurrentInputValue.length > 1) {
      getCurrentInputValue = getCurrentInputValue.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[getCurrentInputIndex] = getCurrentInputValue;

    setOtp(newOtp);

    if (getCurrentInputValue && getCurrentInputIndex < OTP_LENGTH - 1) {
      inputRefs.current[getCurrentInputIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>OTP Input</h1>
      <div className="flex mt-10 mb-5 justify-center gap-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(event) => handleOtpChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className="w-12 h-12 text-center text-lg"
            autoFocus={index === 0}
            ref={(el) => {
              inputRefs.current[index] = el; //store ref focus
            }}
          />
        ))}
      </div>
      <Button disabled={otp.some((digit) => digit === "")}>Verify</Button>
    </div>
  );
}

export default OtpInput;
