import React, { useEffect, useRef, useState } from 'react';
import { Key } from 'iconoir-react';
import { verifyAccount } from '../api/base-api.mjs';
// todo: refactor and optimize the code
export const OtpForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isPaste, setIsPaste] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [email, setEmail] = useState('');

  const otpRef = useRef(otp);
  const inputsRef = useRef(inputs);
  const regex = /^[0-9]+$/; // Numbers: 0-9
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setInputs(() => {
      let tempInputs = Array.from(
        document.querySelectorAll('.otp-field input')
      );
      inputsRef.current = tempInputs;
      return tempInputs;
    });
  }, []);

  useEffect(() => {
    inputsRef.current.forEach((input) => {
      input.addEventListener('focus', moveCursorToEnd);
      input.addEventListener('click', moveCursorToEnd);
      input.addEventListener('paste', (e) => clipBoardHandler(e));
      input.addEventListener('keydown', (e) => keyHandler(e));
    });
  }, []);

  useEffect(() => {
    otpRef.current = otp;
    updateFields();
  }, [otp]);

  useEffect(() => {
    formValidation();
  }, [email, otp]);

  // =======================================================
  // Update the OTP (One Time Password)
  // =======================================================
  const updateOtp = ({ inputIndex = null, value = null, values = null }) => {
    setOtp((otp) => {
      let tempOtp = [];
      if (values) {
        tempOtp = [...values];
      } else {
        tempOtp = [...otp];
        tempOtp[inputIndex] = value;
      }
      otpRef.current = tempOtp;
      return tempOtp;
    });
  };

  // =======================================================
  // Update Fields
  // =======================================================
  const updateFields = () => {
    if (isPaste) {
      setIsPaste(!isPaste);

      for (let i = 0; i < otpRef.current.length; i++) {
        inputsRef.current[i].disabled = false;
        if (otpRef.current[i] === '') {
          inputsRef.current[i].disabled = false;
          inputsRef.current[i].focus();
          break;
        }
      }
    } else {
      const focusedInput = inputsRef.current.find(
        (input) => input === document.activeElement
      );

      if (focusedInput) {
        const nextInput = focusedInput.nextElementSibling;
        if (focusedInput.value !== '' && nextInput) {
          nextInput.disabled = false;
          nextInput.focus();
        }
      }
    }
  };

  // =======================================================
  // Move cursor to the end of the input
  // =======================================================
  function moveCursorToEnd(e) {
    const value = e.target.value;
    e.target.setSelectionRange(value.length, value.length);
  }

  // =======================================================
  // ClipBoard Handler
  // =======================================================
  function clipBoardHandler(e) {
    const inputIndex = inputsRef.current.findIndex(
      (input) => input === e.target
    );

    if (inputIndex === 0) {
      e.preventDefault();
      const paste = (e.clipboardData || window.Clipboard).getData('text');

      const values = Array.from(paste).slice(0, 6);
      const filledValues = values.concat(Array(6 - values.length).fill('')); //If paste contains less than 6 values, fill the rest with empty strings

      if (values.every((value) => regex.test(value))) {
        updateOtp({ values: paste ? filledValues : null });
        setIsPaste(!isPaste);
      } else {
        console.error('Error: cannot paste OTP. Can only contain numbers');
      }
    }
  }

  // =======================================================
  // Key Handler
  // =======================================================
  const keyHandler = (e) => {
    const inputIndex = inputsRef.current.findIndex(
      (input) => input === e.target
    );
    const inputValue = e.target.value;
    const prevInput = inputsRef.current[inputIndex - 1];

    if (regex.test(e.key)) {
      updateOtp({ inputIndex, value: e.key });
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (inputValue !== '') {
        updateOtp({ inputIndex, value: '' });
      } else {
        if (prevInput) prevInput.focus();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      // Allow paste shortcut to be handled by the paste event listener
    } else {
      e.preventDefault();
    }
  };

  // =======================================================
  // Email Handler
  // =======================================================
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const formValidation = () => {
    if (otp.some((input) => input === '') || !emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const tempOtp = otp.join('');
    const payLoad = {
      email,
      code: tempOtp,
    };

    try {
      const data = await verifyAccount(payLoad);
      if (data) {
        setEmail('');
        updateOtp({ values: Array(6).fill('') });
      }
    } catch (error) {
      throw error;
      // Provide user feedback here
    }
  };

  return (
    <>
      <form
        action=""
        className="otp-form shadow__general"
        onSubmit={(e) => formHandler(e)}
      >
        <div className="form__header">
          <span className="form__icon-status">
            <Key />
          </span>
          <span>Account activation</span>
        </div>
        <label>
          <span>Email:</span>
          <input type="email" onChange={emailHandler} value={email} />
        </label>

        <div className="otp-field">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                autoFocus={index === 0}
                disabled={index !== 0}
                type="text"
                maxLength="1"
                value={value}
                readOnly
              />
            );
          })}
        </div>

        <input type="submit" value="Verify" disabled={!formValidation()} />

        <div className="form__footer form__msg form__msg-suggestion">
          <span>
            Haven't recieved a verification code? <a href="">Resend code</a>
          </span>
        </div>
      </form>
    </>
  );
};
