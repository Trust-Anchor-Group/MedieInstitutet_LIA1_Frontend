import React, { useState, useRef, useEffect } from 'react';

export const OtpInput = ({ numberOfDigits, onOtpChange, error }) => {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''));
  const otpInputRef = useRef([]);
  const numberRegex = /^[0-9]+$/; // Numbers: 0-9

  useEffect(() => {
    onOtpChange(otp.join(''));
  }, [otp]);

  // =======================================================
  // Update Fields
  // =======================================================
  const handleChange = (value, index) => {
    if (numberRegex.test(value) || value === '') {
      let tempArr = [...otp];
      tempArr[index] = value;
      setOtp(tempArr);

      if (value && index < numberOfDigits - 1) {
        otpInputRef.current[index + 1].disabled = false;
        otpInputRef.current[index + 1].focus();
      }
    }
  };

  // =======================================================
  // Key Handler
  // =======================================================
  const handleKeys = (e, index) => {
    if (numberRegex.test(e.key) && e.target.value !== '') {
      e.preventDefault();

      handleChange(e.key, index);
    } else if (e.key === 'Backspace' && index > 0) {
      if (e.target.value !== '') {
        handleChange('', index);
      } else {
        otpInputRef.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && otpInputRef.current[index - 1]) {
      otpInputRef.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && otpInputRef.current[index + 1]) {
      otpInputRef.current[index + 1].focus();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      // Unlock paste shortcut command to be handled by the paste event listener
      return;
    }
  };

  // =======================================================
  // ClipBoard Handler
  // =======================================================
  function clipBoardHandler(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');

    const values = Array.from(paste).slice(0, 6);
    const filledValues = values.concat(Array(6 - values.length).fill('')); //If paste contains less than 6 values, fill the rest with empty strings

    if (values.every((value) => numberRegex.test(value))) {
      setOtp(filledValues);
      for (let i = 0; i < filledValues.length; i++) {
        if (filledValues[i] !== '') {
          otpInputRef.current[i].disabled = false;
        } else {
          otpInputRef.current[i].disabled = false;
          otpInputRef.current[i].focus();
          break;
        }
      }
    }
  }

  return (
    <div className="otp-field">
      {otp.map((digit, index) => {
        return (
          <input
            type="text"
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeys(e, index)}
            onPaste={(e) => index === 0 && clipBoardHandler(e)}
            ref={(reference) => (otpInputRef.current[index] = reference)}
            disabled={index === 0 ? false : true}
            className={error && !digit && 'error'}
          />
        );
      })}
    </div>
  );
};
