import React, { useEffect, useState, useContext } from 'react';
import { getIdAttr, registerId } from '../api/base-api.mjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { WarningCircle } from 'iconoir-react';
import { passwordSchema } from '../validation/schemas/generalSchemas';
import UserContext from '../state/UserContext';
import { TailSpin } from 'react-loader-spinner';
import labelMapping from '../utilities/labelMapping';
import { MessageBox } from './MessageBox';

export const IdForm = () => {
  const { userInfo, updateUserInfoId } = useContext(UserContext);
  const [idAttributes, setIdAttributes] = useState([]);
  const [feedback, setFeedback] = useState('');

  const generateSchema = (fields) => {
    const shape = {
      password: passwordSchema,
    };
    fields.forEach((field) => {
      shape[field] = Yup.string().required(
        `${labelMapping[field]} is required`
      );
    });
    return Yup.object().shape(shape);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(generateSchema(idAttributes)),
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const response = await getIdAttr();
        setIdAttributes(response.data.Required);
      } catch (error) {
        throw new Error(error.message || 'Error fetching ID attributes');
      }
    };

    fetchIds();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await registerId(data);
      if (response.success) {
        const { id } = response.data.Identity;
        updateUserInfoId(id);
        reset();
        setFeedback({
          type: 'success',
          message: 'Successfully registred a new ID.',
        });
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MessageBox type="info">
        <p>
          You are required to create a unique identity (ID). This ID will be
          used to verify your identity within our system. It is crucial that all
          information provided is accurate, as it will be used for official
          identification purposes.
        </p>
      </MessageBox>
      <div className="form__header">
        {feedback.message && (
          <div className={`form__feedback form__feedback-${feedback.type}`}>
            {feedback.message}
          </div>
        )}
      </div>

      {idAttributes?.map((attr, index) => {
        return (
          <label key={index}>
            <span>{labelMapping[attr] || attr}</span>
            <input type="text" name={attr} {...register(attr)} />
            {errors[attr] && (
              <span className="form__msg form__msg-error">
                <WarningCircle />
                <span>{errors[attr].message}</span>
              </span>
            )}
          </label>
        );
      })}

      <label htmlFor="password">
        <span>Account password</span>
        <input
          id="password"
          type="password"
          name="password"
          {...register('password')}
        />
        {errors.password && (
          <span className="form__msg form__msg-error">
            <WarningCircle />
            <span>{errors.password.message}</span>
          </span>
        )}
      </label>

      <input
        type="hidden"
        {...register('username')}
        name="username"
        defaultValue={userInfo.userName}
      />
      <input
        type="hidden"
        {...register('email')}
        name="email"
        defaultValue={userInfo.eMail}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <TailSpin /> : 'Apply'}
      </button>
    </form>
  );
};
