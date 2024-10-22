import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccount } from '../api/base-api.mjs';
import { OtpInput } from './OtpInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import verifySchema from '../validation/schemas/verifySchema';
import { TailSpin } from 'react-loader-spinner';
import { Key, WarningCircle } from 'iconoir-react';

export const VerifyForm = () => {
  const [feedback, setFeedback] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(verifySchema), // Integrate the Yup schema with React Hook Form
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const { email, otp: code } = data;
    try {
      const response = await verifyAccount({ email, code });
      if (response.success) {
        setFeedback({
          type: 'success',
          message: 'Successfully verified your account. Redirecting...',
        });
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <>
      <form
        action=""
        className="form__small otp-form shadow__general"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form__header">
          <span className="form__icon-status">
            <Key />
          </span>
          <span>Account activation</span>

          {feedback.message && (
            <div className={`form__feedback form__feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>

        <label>
          <span>Email:</span>
          <input
            name="email"
            type="email"
            className={errors.email ? 'error' : ''}
            {...register('email')}
          />
          {errors.email && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.email.message}</span>
            </span>
          )}
        </label>

        <label htmlFor="">
          <span>Verification code:</span>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OtpInput
                onOtpChange={field.onChange} // Handle changes to update the form state
                numberOfDigits={6} // Keep your number of digits
                error={errors.otp}
              />
            )}
          />

          {errors.otp && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.otp.message}</span>
            </span>
          )}
        </label>

        <button type="submit">{isSubmitting ? <TailSpin /> : 'Verify'}</button>

        <div className="form__footer form__msg form__msg-suggestion">
          <span>
            Haven't recieved a verification code? <a href="">Resend code</a>
          </span>
        </div>
      </form>
    </>
  );
};
