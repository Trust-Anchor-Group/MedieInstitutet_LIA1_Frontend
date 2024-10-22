import * as Yup from 'yup';
import { emailSchema, usernameSchema, passwordSchema } from './generalSchemas';

const registerSchema = Yup.object().shape({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema
});

export default registerSchema;