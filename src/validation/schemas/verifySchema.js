import * as Yup from 'yup';
import { emailSchema } from './generalSchemas';

const otpInput = Yup.string().required('Verification code is required').min(6, 'Must contain 6 numbers');

const verifySchema = Yup.object().shape({
    email: emailSchema,
    otp: otpInput
});

export default verifySchema;