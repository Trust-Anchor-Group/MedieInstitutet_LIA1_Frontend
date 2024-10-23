import * as Yup from 'yup';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailSchema = Yup.string()
    .required('Email is required')
    .matches(emailPattern, 'Email is not valid');

export const passwordSchema = Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters');

export const usernameSchema = Yup.string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters');
