import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAccount } from '../api/base-api.mjs';
import { User } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../validation/schemas/registerSchema';
import { WarningCircle } from 'iconoir-react';
import { TailSpin } from 'react-loader-spinner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    try {
      const response = await registerAccount({ username, email, password });
      if (response.success) {
        setFeedback({
          type: 'success',
          message:
            'Successfully registred your account. Check your email for a validation code.',
        });
        setTimeout(() => navigate('/verify'), 3000);
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
        onSubmit={handleSubmit(onSubmit)}
        className="form__small shadow__general"
      >
        <div className="form__header">
          <span className="form__icon-status">
            <User />
          </span>
          <span>Register account</span>

          {feedback.message && (
            <div className={`form__feedback form__feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>
        <label>
          <span>Username:</span>
          <input
            name="username"
            type="text"
            className={errors.username ? 'error' : ''}
            {...register('username')}
          />
          {errors.username && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.username.message}</span>
            </span>
          )}
        </label>

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

        <label>
          <span>Password:</span>
          <input
            name="password"
            type="password"
            className={errors.password ? 'error' : ''}
            {...register('password')}
          />
          {errors.password && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.password.message}</span>
            </span>
          )}
        </label>

        <button type="submit">
          {isSubmitting ? <TailSpin /> : 'Register'}
        </button>

        <div className="form__footer">
          <div className="form__alternative">
            <p>
              Already have an account? <Link to="/login"> Sign in</Link>
            </p>
          </div>
          <div className="form__terms">
            <p>
              By registering, you consent to our{' '}
              <a href="#" target="_blank">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" target="_blank">
                Privacy Policy
              </a>
              , including the collection and use of your information as
              described.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
