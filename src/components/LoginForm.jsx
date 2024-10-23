import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../validation/schemas/loginSchema';
import { Fingerprint, WarningCircle } from 'iconoir-react';
import { login } from '../api/base-api.mjs';
import AuthContext from '../state/AuthContext';
import { TailSpin } from 'react-loader-spinner';

export const LoginForm = () => {
  // Set up the form with React Hook Form and Yup validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema), // Integrate the Yup schema with React Hook Form
    mode: 'onBlur',
  });

  const { loginState } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({});
  const navigate = useNavigate();

  useEffect(() => {}, [feedback]);

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const response = await login({ username, password });

      if (response.success) {
        reset();
        loginState();
        setFeedback({
          type: 'success',
          message: 'Success! Redirecting...',
        });
        setTimeout(() => navigate('/dashboard'), 1000);
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
            <Fingerprint />
          </span>
          <span>Sign in</span>

          {feedback.message && (
            <div className={`form__feedback form__feedback-${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>

        <label htmlFor="username">
          <span>Username:</span>
          <input
            id="username"
            type="text"
            className={errors.username ? 'error' : ''}
            {...register('username')}
            disabled={isSubmitting}
          />
          {errors.username && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.username.message}</span>
            </span>
          )}
        </label>

        <label htmlFor="password">
          <span>Password:</span>
          <input
            id="password"
            type="password"
            className={errors.password ? 'error' : ''}
            {...register('password')}
            disabled={isSubmitting}
          />
          {errors.password && (
            <span className="form__msg form__msg-error">
              <WarningCircle />
              <span>{errors.password.message}</span>
            </span>
          )}
        </label>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <TailSpin /> : 'Sign in'}
        </button>

        <div className="form__footer">
          <div className="register-link form__alternative">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
