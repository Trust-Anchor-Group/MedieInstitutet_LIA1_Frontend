import * as Yup from 'yup';
import { usernameSchema, passwordSchema } from './generalSchemas';

const loginSchema = Yup.object().shape({
    username: usernameSchema,
    password: passwordSchema
});

export default loginSchema;