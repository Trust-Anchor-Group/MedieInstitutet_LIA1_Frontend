// src/validation/schemas/contractSigningSchema.js
import * as Yup from 'yup';

const legalIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}@legal\.mateo\.lab\.tagroot\.io$/;
const basicIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const contractSigningSchema = Yup.object().shape({
    keyId: Yup.string()
        .required('Key ID is required')
        .matches(basicIdPattern, 
            'Key ID must be in UUID format'
        ),
    legalId: Yup.string()
        .required('Legal ID is required')
        .matches(legalIdPattern, 
            'Legal ID must be in format: UUID@legal.mateo.lab.tagroot.io'
        ),
    contractId: Yup.string()
        .required('Contract ID is required')
        .matches(legalIdPattern, 
            'Contract ID must be in format: UUID@legal.mateo.lab.tagroot.io'
        ),
    role: Yup.string()
        .required('Role is required')
        .oneOf(
            ['Creator', 'Borrower', 'Lender', 'TrustProvider'],
            'Invalid role selection. Must be Creator, Borrower, Lender, or TrustProvider'
        ),
    // Local Name and Namespace for key algorithm
    localName: Yup.string()
        .required('Local Name is required'),
    namespace: Yup.string()
        .required('Namespace is required'),
    // Passwords for key and account
    keyPassword: Yup.string()
        .required('Key password is required')
        .min(4, 'Key password must be at least 4 characters long'),
    accountPassword: Yup.string()
        .required('Account password is required')
        .min(4, 'Account password must be at least 4 characters long')
}).test(
    'passwords-different',
    'Key password and account password must be different',
    function(values) {
        if (!values.keyPassword || !values.accountPassword) return true;
        return values.keyPassword !== values.accountPassword;
    }
);

export default contractSigningSchema;